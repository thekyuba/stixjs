/**
 * Library constructor 
 * @param {node} rootNode 
 * @param {object} config
 *  
 * examplary config:
 * data: {name: 'Jacob'}
 * template: <div>Hello World</div>
 *  
 */
function Stix (rootNode, config) {
    const self = this;

    this.rootNode = rootNode;
    this.template = config.template;
    this.data = _setData(config.data);
    
    //lifecycle hooks
    this.onMounted = config.onMounted;


    this.render = function () {
        // const interpolatedTemplate = _interpolate(this.template, this.data);

        // this.rootNode.innerHTML = interpolatedTemplate;
        // this.data.interpolate();

        this.onMounted();
    }

    this.setTemplate = function () {
        this.rootNode.innerHTML = this.template;
    }

    /** Lifecycle */
    this.setTemplate();
    traverseDOM(this.rootNode, this.data);
    this.render();

    ////////////////////////
    function ReactiveDataObject (data) {
        for (prop in data) {
            let privateProp = data[prop];
    
            Object.defineProperty(this, prop, {
                get: function () {
                    return privateProp;
                },
                set: function (val) {
                    privateProp = val;
                    this.interpolate();
                }
            });
        }

        this.nodes = [];

        this.pushNode = function (node) {
            this.nodes.push(node);
        }

        this.inspectNode = function (clone) {
            const ownProps = Object.getOwnPropertyNames(this);
            const template = clone.innerHTML;
            const found = ownProps.find((prop) => template.includes(prop));

            return found;
        }

        this.interpolate = function () {
            this.nodes.map((node) => {
                Array.from(node.childNodes).map((childNode) => {
                    if (!childNode.cachedNodeValue) {
                        childNode.cachedNodeValue = childNode.nodeValue;
                    }
                    childNode.nodeValue = _interpolate(childNode.cachedNodeValue, self.data);
                });
            });
        }
    }

    function _interpolate (template, data) {
        if (template) {
            return template.replace(/\{\{\s?(\w+)\s?\}\}/g, (match, submatch) => {
                return data[submatch] || ''
            });
        }
    }

    function _setData (data) {
        const reactiveData = new ReactiveDataObject(data);

        return reactiveData;
    }

    function traverseDOM (node, data) {
        for (let i = 0; i < node.children.length; i++) {
            var child = node.children[i];

            if (data) {
                var nodeToInspect = _stripChildren(child);
                var inspectedNode = data.inspectNode(nodeToInspect);

                if (inspectedNode) {
                    data.pushNode(child);
                }
            }

            traverseDOM(child, data);
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
