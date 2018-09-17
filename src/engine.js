/**
 * This is the heart of StixJS
 * The constructor takes an object and makes its props reactive usigin getters and setters
 * It keeps track of DOM nodes with reactive props
 * And triggers interpolation whenever a change is made to those props
 * @param {Object} data 
 */
function ReactiveData (data) {
    const self = this;

    for (let prop in data) {
        let privateProp = data[prop];

        Object.defineProperty(this, prop, {
            get: function () {
                return privateProp;
            },
            set: function (val) {
                privateProp = val;
                this.interpolateAll();
            }
        });
    }

    this.nodes = [];

    this.pushNode = function (node) {
        this.nodes.push(node);
    }

    this.findInterpolation = function (clone) {
        const preparedClone = _stripChildren(clone)
        const ownProps = Object.getOwnPropertyNames(this);
        const template = preparedClone.innerHTML;
        const hasInterpolation = ownProps.find((prop) => template.includes(prop));

        return hasInterpolation;
    }

    this.interpolateAll = function () {
        this.nodes.map((node) => {
            Array.from(node.childNodes).map((childNode) => {
                // cache template only on initial interpolation
                // this step is needed to keep track of props in curly braces
                if (!childNode.cachedNodeValue) {
                    childNode.cachedNodeValue = childNode.nodeValue;
                }
                childNode.nodeValue = _interpolate(childNode.cachedNodeValue);
            });
        });
    }

    /**
     * @param {String} template
     */
    function _interpolate (template) {
        if (template) {
            return template.replace(/\{\{\s?(\w+)\s?\}\}/g, (match, submatch) => {
                return self[submatch] || ''
            });
        }
    }

    function _stripChildren (node) {
        const clonedNode = node.cloneNode(true);

        while (clonedNode.firstElementChild) {
            clonedNode.removeChild(clonedNode.firstElementChild);
        }

        return clonedNode;
    }
}

export {
    ReactiveData
}