import { ReactiveData } from './engine';

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
            _renderInterpolatedView();
        }

        ////////////////////////
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
                    var nodeWithInterpolation = data.findInterpolation(child);

                    if (nodeWithInterpolation) {
                        data.pushNode(child);
                    }
                }

                _bindViewToModel(child, data);
            }
        }

        function _renderInterpolatedView () {
            vm.data.interpolateAll();

            vm.onMounted();
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

