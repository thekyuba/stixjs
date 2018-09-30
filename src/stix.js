import { Binding } from './engine';

(function (global, factory) {
    global.Stix = factory();
}(window, (function () {
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

        this.rootNode = _setRootNode();
        this.template = _setTemplate(config.template);
        this.data = config.data;
        this.watchers = {};

        //lifecycle hooks
        this.onMounted = config.onMounted;

        this.digest = function () {
            _setRootTemplate();
            _setReactiveData();
            _bindViewToModel(this.rootNode, this.data);
            _viewReady();
        };

        ////////////////////////
        function _setRootTemplate () {
            vm.rootNode.innerHTML = vm.template;
        }

        function _setReactiveData () {
            for (const prop in vm.data) {
                if (vm.data.hasOwnProperty(prop)) {
                    vm.watchers[prop] = new Binding({
                        object: vm.data,
                        property: prop
                    });
                }
            }
        }

        function _bindViewToModel (node, data) {
            for (let i = 0; i < node.children.length; i++) {
                const child = node.children[i];

                if (data) {
                    const interpolatedPropName = _findInterpolation(child, vm.data);
                    const bindingOpts = _getBindingOpts(child);

                    if (interpolatedPropName) {
                        vm.watchers[interpolatedPropName].addBinding(bindingOpts);
                    }
                }

                _bindViewToModel(child, data);
            }
        }

        function _findInterpolation (clone, objProps) {
            const preparedClone = _removeChildren(clone);
            const ownProps = Object.getOwnPropertyNames(objProps);
            const template = preparedClone.outerHTML;
            const propName = ownProps.find((prop) => template.includes(prop));

            return propName;
        }

        function _getBindingOpts (element) {
            // two-way data binding
            // currently works only for input fields
            if (!element.childNodes.length && element.attributes.length) {
                const boundAttr = Array.from(element.attributes).find((attr) => attr.value.match(/\{\{\s?(\w+)\s?\}\}/g));

                if (boundAttr) {
                    return {
                        element,
                        attribute: boundAttr.name,
                        customEvent: 'input'
                    };
                }
            }

            // one-way data binding
            return { element };
        }

        function _removeChildren (node) {
            const clonedNode = node.cloneNode(true);

            while (clonedNode.firstElementChild) {
                clonedNode.removeChild(clonedNode.firstElementChild);
            }

            return clonedNode;
        }

        function _viewReady () {
            vm.onMounted();
        }

        function _setRootNode () {
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

