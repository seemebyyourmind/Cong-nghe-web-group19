
const MessagePanel = cc.Class({
    extends: cc.Component,

    properties: {
        message: cc.Label,
    },

    onOpen(messageText, state){
        if (state == true){
            this.node.color = new cc.Color(141, 233, 128);
        }else{
            this.node.color = new cc.Color(243, 150, 150);
        }
        this.message.string = messageText;
        this.node.active = true;
    },

    onClose(){
        this.node.active = false;
    }
});
