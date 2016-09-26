/*
 * Copyright (C) 2015 con terra GmbH (info@conterra.de)
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *         http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
define([
    "dojo/_base/declare",
    "dojo/_base/array",
    "ct/_Connect"
], function (declare, d_array, _Connect) {
    return declare([_Connect], {
        activate: function () {
            this._enabledServiceNodes = this._getEnabledServiceNodesIDs();
            this.connect(this._mapModel, "onModelNodeStateChanged", function () {
                var oldEnabledServiceNodesIDs = this._enabledServiceNodes;
                var newEnabledServiceNodesIDs = this._getEnabledServiceNodesIDs();
                this._enabledServiceNodes = newEnabledServiceNodesIDs;
                if (oldEnabledServiceNodesIDs.length !== newEnabledServiceNodesIDs.length) {
                    d_array.forEach(newEnabledServiceNodesIDs, function (id, i) {
                        if (oldEnabledServiceNodesIDs[i] !== newEnabledServiceNodesIDs[i]) {
                            this._dataModel.setDatasource();
                        }
                    }, this);
                }
            });
        },
        _getEnabledServiceNodesIDs: function () {
            return d_array.map(this._mapModel.getEnabledServiceNodes(), function (node) {
                return node.id;
            }, this);
        }
    });
});