(function (global, factory) {
	global.Stix = factory();
}(window, (function () {
    'use strict';
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
        const vm = this;

        this.rootNode = _setRootNode(rootNode)
        this.template = _setTemplate(config.template);
        this.data = {};
        
        //lifecycle hooks
        this.onMounted = config.onMounted;

        this.digest = function () {
            _setRootTemplate();
            _setReactiveData(config.data);
            _bindViewToModel(this.rootNode, this.data);
            _render();
        }

        ////////////////////////
        function ReactiveData (data) {
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
                const ownProps = Object.getOwnPropertyNames(this);
                const template = clone.innerHTML;
                const hasInterpolation = ownProps.find((prop) => template.includes(prop));

                return hasInterpolation;
            }

            this.interpolateAll = function () {
                this.nodes.map((node) => {
                    Array.from(node.childNodes).map((childNode) => {
                        //cache template only on initial interpolation
                        if (!childNode.cachedNodeValue) {
                            childNode.cachedNodeValue = childNode.nodeValue;
                        }
                        childNode.nodeValue = _interpolate(childNode.cachedNodeValue, vm.data);
                    });
                });
            }
        }

        function _setRootTemplate () {
            vm.rootNode.innerHTML = vm.template;
        }

        function _setReactiveData (data) {
            vm.data = new ReactiveData(data);
        }

        function _bindViewToModel (node, data) {
            for (let i = 0; i < node.children.length; i++) {
                var child = node.children[i];

                if (data) {
                    var nodeWithInterpolation = data.findInterpolation(_stripChildren(child));

                    if (nodeWithInterpolation) {
                        data.pushNode(child);
                    }
                }

                _bindViewToModel(child, data);
            }
        }

        function _render () {
            vm.data.interpolateAll();

            vm.onMounted();
        }

        function _stripChildren (node) {
            const clonedNode = node.cloneNode(true);

            while (clonedNode.firstElementChild) {
                clonedNode.removeChild(clonedNode.firstElementChild);
            }

            return clonedNode;
        }

        function _interpolate (template, data) {
            if (template) {
                return template.replace(/\{\{\s?(\w+)\s?\}\}/g, (match, submatch) => {
                    return data[submatch] || ''
                });
            }
        }

        function _setRootNode (rootNode) {
            if (!rootNode.nodeName) {
                throw new Error(`${rootNode} is not a valid DOM node`);
            }

            return rootNode;
        }

        function _setTemplate (template) {
            if (!template) {
                throw new Error('The config object must have a defined template');
            }

            return template;
        }

        this.digest();
    }

    return Stix;
})));

