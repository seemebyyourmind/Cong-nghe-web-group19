
cc.Class({
    extends: cc.Component,

    properties: {
        skillPrefab: [cc.Prefab],
    },

    // LIFE-CYCLE CALLBACKS:

    onInit(skillIndex){
        console.log(skillIndex);
        this.skill = cc.instantiate(this.skillPrefab[skillIndex]);
    },

    start() {
        // Register mouse event listeners
        this.node.on(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this);
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this);
    },

    onMouseMove(event) {
        // Get the mouse position relative to the node's parent
        const mousePos = this.node.parent.convertToNodeSpaceAR(event.getLocation());
        // Set the node's position to the mouse position
        this.node.position = mousePos;
    },

    onMouseDown(event) {
        // Get the mouse position relative to the node's parent
        const mousePos = this.node.parent.convertToNodeSpaceAR(event.getLocation());
        this.skill.setParent(this.node.parent);
        this.skill.position = mousePos;
        this.node.active = false;
    },

});
