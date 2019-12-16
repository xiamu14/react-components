import React, { PureComponent } from 'react';
import { SchemaForm, Submit, createFormActions } from '@uform/antd';
import { Button } from 'antd';

/*! *****************************************************************************
Copyright (c) Microsoft Corporation. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
/* global Reflect, Promise */

var extendStatics = function(d, b) {
    extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return extendStatics(d, b);
};

function __extends(d, b) {
    extendStatics(d, b);
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function styleInject(css, ref) {
  if ( ref === void 0 ) ref = {};
  var insertAt = ref.insertAt;

  if (!css || typeof document === 'undefined') { return; }

  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';

  if (insertAt === 'top') {
    if (head.firstChild) {
      head.insertBefore(style, head.firstChild);
    } else {
      head.appendChild(style);
    }
  } else {
    head.appendChild(style);
  }

  if (style.styleSheet) {
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
}

var css = ".search_bar--box .border {\n  border: 1px solid #eee; }\n\n.search_bar--box .btn_search_groups {\n  display: flex;\n  justify-content: flex-start; }\n\n.search_bar--box .w20 {\n  width: 10px; }\n";
styleInject(css);

var actions = createFormActions();
var SearchBar = /** @class */ (function (_super) {
    __extends(SearchBar, _super);
    function SearchBar() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            isSeach: false,
            hasReset: false // NOTE: 用于从 /order/list?uid=xxx 跳转到 /order/list 重新搜索框的标识
        };
        _this.onSubmit = function (v) {
            // NOTE:剔除无效值
            Object.keys(v).map(function (key) {
                // NOTE:非 true 值都是无效值
                if (!v[key]) {
                    delete v[key];
                }
            });
            // NOTE: 应该判断当 v 是空对象时不触发
            if (Object.keys(v).length > 0) {
                /* eslint-disable-next-line */
                _this.props.onCaptureForm(v);
                _this.setState({
                    isSeach: true
                });
            }
        };
        _this.onReset = function () {
            var onSearchReset = _this.props.onSearchReset;
            if (onSearchReset) {
                onSearchReset();
            }
            actions.reset(true, false);
            _this.setState({
                isSeach: false
            });
        };
        return _this;
    }
    SearchBar.getDerivedStateFromProps = function (props, state) {
        if (props.isOneTimeReset && !state.hasReset) {
            actions.reset(true, false);
            return {
                hasReset: true,
                isSeach: false
            };
        }
        return null;
    };
    SearchBar.prototype.render = function () {
        var _a = this.props, schema = _a.schema, inline = _a.inline, labelCol = _a.labelCol, wrapperCol = _a.wrapperCol, border = _a.border, initialValues = _a.initialValues;
        var isSeach = this.state.isSeach;
        return (React.createElement("div", { className: "search_bar--box " + (border ? "border" : "") },
            React.createElement(SchemaForm, { inline: inline === undefined ? true : inline, onSubmit: this.onSubmit, actions: actions, labelCol: labelCol, wrapperCol: wrapperCol, schema: schema, initialValues: initialValues },
                React.createElement("div", { className: "btn_search_groups" },
                    React.createElement(Submit, null, "\u641C\u7D22"),
                    React.createElement("div", { className: "space w20" }),
                    isSeach ? (React.createElement(Button, { type: "primary", onClick: this.onReset }, "\u5168\u90E8")) : ("")))));
    };
    return SearchBar;
}(PureComponent));

export default SearchBar;
//# sourceMappingURL=index.es.js.map
