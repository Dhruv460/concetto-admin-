// const invites = require("../models/invites");
// const inviteSchema = require("../models/invites");
// const teamModel = require("../models/teams");
// const users = require("../models/users");

// const acceptInvite=async(req,res,next)=>{
//     const {inviteId}=req.body;
//     let invite=await inviteSchema.findById(inviteId);
//     if(!invite){
//         res.status(400).send({error:"No such invite ID"});
//     }
//     if(!req.user._id.equals(invite.toUser)){
//         res.status(403).send({error:"Invite is not for given user"})
//     }
//     let team=await teamModel.findById(invite.team);
//     if(!team){
//         res.status(400).send({error:"No such team"});
//     }
//     const currEvents=req.user.events;
//     if(!currEvents.find((e)=>e.equals(team.event))){
//         res.status(400).send({error:"User alredy registered for given event"});
//     }
//     // no constrain on team size
//     let addToTeam=await teamModel.findByIdAndUpdate(invite.team,{$push:{members:req.user._id}});
//     let addPatricipation=await users.findByIdAndUpdate(req.user._id,{$push:{events:team.event},$push:{teams:invite.team}});
//     let delInvite=await invites.findByIdAndDelete(inviteId);
//     console.log(addToTeam,addPatricipation,delInvite);
//     if(addToTeam && addPatricipation && delInvite){
//         res.status(200).send({success:`User added to team ${team.teamName}`})
//     }

//     res.status(500).send({error:"server error"});
// }

// module.exports={acceptInvite}