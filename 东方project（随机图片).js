import { segment } from "oicq";
import fetch from "node-fetch";

//项目路径
const _path = process.cwd();

//消息时间
let timeout = 0; //

//命令规则
export const rule = {
  Baozhen:{
    reg: "^东方|东方project$", //匹配消息正则，命令正则
    priority: 1650, //优先级，越小优先度越高
    describe: "二次元猫娘", //【命令】功能说明
  },
};

//消息撤回方法
export function Chehui(msgRes,e){
	if (timeout!=0 && msgRes && msgRes.message_id){
	  let target = null;
	  if (e.isGroup) {
	    target = e.group;
	  }else{
	    target = e.friend;
	  }
	  if (target != null){
	    setTimeout(() => {
	      target.recallMsg(msgRes.message_id);
	    }, timeout);
	  }
	}  
}
//实现功能方法
export async function Baozhen(e) {
  console.log("用户命令：", e.msg);
  //执行的逻辑功能
	  let msg=[segment.at(e.user_id),	  
	  segment.image(`https://img.paulzzh.tech/touhou/random`)
	  ]
	let msgRes =await e.reply(msg);
	Chehui(msgRes,e)//调用撤回方法
  return true; //返回true 阻挡消息不再往下
}
