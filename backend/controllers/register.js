const invites = require("../models/invites");
const inviteSchema = require("../models/invites");
const teamModel = require("../models/teams");
const users = require("../models/users");

const acceptInvite = async (req, res, next) => {
    if (!req.user) {
        res.status(403).send({ error: "User is not authenticated" })
        return;
    }
    const { inviteId } = req.body;
    let invite = await inviteSchema.findById(inviteId);
    if (!invite) {
        res.status(400).send({ error: "No such invite ID" });
        return;
    }
    if (!req.user._id.equals(invite.toUser)) {
        res.status(403).send({ error: "Invite is not for given user" })
        return;
    }
    let team = await teamModel.findById(invite.team);
    if (!team) {
        res.status(400).send({ error: "No such team" });
        return;
    }
    const currEvents = req.user.events;
    if (currEvents.find((e) => e.equals(team.event))) {
        res.status(400).send({ error: "User alredy registered for given event" });
        return;
    }
    // no constrain on team size
    let addToTeam = await teamModel.findByIdAndUpdate(invite.team, { $push: { members: req.user._id } });
    let addPatricipation1 = await users.findByIdAndUpdate(req.user._id, { $push: { events: team.event } });
    let addPatricipation2 = await users.findByIdAndUpdate(req.user._id, { $push: { teams: invite.team } });

    let delInvite = await invites.findByIdAndDelete(inviteId);
    console.log(addToTeam, addPatricipation1, addPatricipation2, delInvite);
    if (addToTeam && addPatricipation1 && addPatricipation2 && delInvite) {
        res.status(200).send({ success: `User added to team ${team.teamName}` })
        return;
    }

    res.status(500).send({ error: "server error" });
}

const declineInvite = async (req, res) => {
    if (!req.user) {
        res.status(403).send({ error: "User is not authenticated" })
        return;
    }
    const { inviteId } = req.body;
    let invite = await inviteSchema.findById(inviteId);
    if (!invite) {
        res.status(400).send({ error: "No such invite ID" });
        return;
    }
    if (!req.user._id.equals(invite.toUser)) {
        res.status(403).send({ error: "Invite is not for given user" })
        return;
    }
    let delInvite = await invites.findByIdAndDelete(inviteId);
    console.log(delInvite);
    res.status(200).send({ success: "invite declined" });
}

const makeTeam = async (req, res, next) => {
    const { teamName, event } = req.body;
    if (req.user.event.find((eid) => eid.equals(event))) {
        res.status(400).send({ error: "User alredy registered for given event" })
        return;
    }
    const leader = req.user._id;
    const members = [req.user._id];
    let ins = await teamModel.insertMany([{ teamName, event, leader, members }]);
    let updevents = await users.findByIdAndUpdate(req.user._id, { $push: { events: event } });
    let updteams = await users.findByIdAndUpdate(req.user._id, { $push: { teams: ins[0]._id } });
    console.log(ins, updevents, updteams);
    res.status(200).send({ success: "Team created" })

}

const sendInvite = async (req, res) => {
    const { team, toUser } = req.body; //team id, to user id
    const teamVal = await teamModel.findById(team);
    if (!teamVal) {
        res.status(400).send({ error: "No such team exists" });
        return;
    }
    if (!req.user._id.equals(teamVal.leader)) {
        res.status(403).send({ error: "User is not the leader of the team" });
        return;
    }
    let toUserVal = await users.findById(toUser);
    if (!toUser) {
        res.status(400).send({ error: "Invitee is not found" });
        return;
    }
    if (toUserVal.events.find((eid) => eid.equals(team))) {
        res.status(400).send({ error: "Invitee is alredy registered for the event" });
        return;
    }
    let ins = await inviteSchema.insertMany([{ fromUser: req.user._id, toUser, team }]);
    console.log(ins);
    res.status(200).send({ success: "Invite send" });
}

const getInvites = async (req, res) => {
    let invites = await inviteSchema.find({ toUser: req.user._id });
    res.status(200).send(invites)
}

const teamInfo=async(req,res)=>{
    let team=await teamModel.findById(req.params.teamId).populate("members").populate("event");
    res.status(200).send(team);
}

module.exports = { acceptInvite, makeTeam, sendInvite, declineInvite,getInvites,teamInfo }