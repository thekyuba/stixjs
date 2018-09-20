import { ReactiveData } from './engine';

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
        this.data = {};

        //lifecycle hooks
        this.onMounted = config.onMounted;

        this.digest = function () {
            _setRootTemplate();
            _setReactiveData(config.data);
            _bindViewToModel(this.rootNode, this.data);
            _renderInterpolatedView();
        };

        ////////////////////////
        function _setRootTemplate () {
            vm.rootNode.innerHTML = vm.template;
        }

        function _setReactiveData (data) {
            vm.data = new ReactiveData(data);
        }

        function _bindViewToModel (node, data) {
            for (let i = 0; i < node.children.length; i++) {
                const child = node.children[i];

                if (data) {
                    const interpolatedPropName = data.findInterpolation(child);

                    if (interpolatedPropName) {
                        data.assignNodeToProp(child, interpolatedPropName);
                    }
                }

                _bindViewToModel(child, data);
            }
        }

        function _renderInterpolatedView () {
            vm.data.interpolateAllProps();

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

