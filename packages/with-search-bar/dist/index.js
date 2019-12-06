'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = require('react');
var React__default = _interopDefault(React);
var antd = require('antd');
var antd$1 = require('@uform/antd');

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

var css = ".btn_search_groups {\n  display: flex;\n  justify-content: flex-start; }\n\n.w20 {\n  width: 10px; }\n";
styleInject(css);

function withSearchBar(WrappedComponent, props) {
    return function () {
        var _a = React.useState(false), isSearch = _a[0], setIsSearch = _a[1];
        var onSubmit = function (v) {
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
                props.onCaptureForm(v);
                setIsSearch(true);
            }
        };
        var onReset = function () {
            var onSearchReset = props.onSearchReset;
            if (onSearchReset) {
                onSearchReset();
            }
            setIsSearch(false);
        };
        return (React__default.createElement(WrappedComponent, { onSubmit: onSubmit, isSearch: isSearch },
            React__default.createElement("div", { className: "btn_search_groups" },
                React__default.createElement(antd$1.Submit, null),
                React__default.createElement("div", { className: "space w20" }),
                isSearch ? (React__default.createElement(antd.Button, { type: "primary", onClick: onReset }, "\u5168\u90E8")) : (""))));
    };
}

exports.default = withSearchBar;
//# sourceMappingURL=index.js.map
