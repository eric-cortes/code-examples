import ye, { useState as Z, useEffect as K, useRef as d1 } from "react";
var se = { exports: {} }, $ = {};
/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ze;
function x1() {
  if (Ze)
    return $;
  Ze = 1;
  var r = ye, i = Symbol.for("react.element"), a = Symbol.for("react.fragment"), d = Object.prototype.hasOwnProperty, p = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner, C = { key: !0, ref: !0, __self: !0, __source: !0 };
  function w(j, o, g) {
    var v, c = {}, _ = null, b = null;
    g !== void 0 && (_ = "" + g), o.key !== void 0 && (_ = "" + o.key), o.ref !== void 0 && (b = o.ref);
    for (v in o)
      d.call(o, v) && !C.hasOwnProperty(v) && (c[v] = o[v]);
    if (j && j.defaultProps)
      for (v in o = j.defaultProps, o)
        c[v] === void 0 && (c[v] = o[v]);
    return { $$typeof: i, type: j, key: _, ref: b, props: c, _owner: p.current };
  }
  return $.Fragment = a, $.jsx = w, $.jsxs = w, $;
}
var D = {};
/**
 * @license React
 * react-jsx-runtime.development.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */
var Ae;
function f1() {
  return Ae || (Ae = 1, process.env.NODE_ENV !== "production" && function() {
    var r = ye, i = Symbol.for("react.element"), a = Symbol.for("react.portal"), d = Symbol.for("react.fragment"), p = Symbol.for("react.strict_mode"), C = Symbol.for("react.profiler"), w = Symbol.for("react.provider"), j = Symbol.for("react.context"), o = Symbol.for("react.forward_ref"), g = Symbol.for("react.suspense"), v = Symbol.for("react.suspense_list"), c = Symbol.for("react.memo"), _ = Symbol.for("react.lazy"), b = Symbol.for("react.offscreen"), T = Symbol.iterator, B = "@@iterator";
    function y(l) {
      if (l === null || typeof l != "object")
        return null;
      var t = T && l[T] || l[B];
      return typeof t == "function" ? t : null;
    }
    var h = r.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;
    function u(l) {
      {
        for (var t = arguments.length, s = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++)
          s[n - 1] = arguments[n];
        V("error", l, s);
      }
    }
    function V(l, t, s) {
      {
        var n = h.ReactDebugCurrentFrame, m = n.getStackAddendum();
        m !== "" && (t += "%s", s = s.concat([m]));
        var L = s.map(function(f) {
          return String(f);
        });
        L.unshift("Warning: " + t), Function.prototype.apply.call(console[l], console, L);
      }
    }
    var k = !1, O = !1, Ee = !1, Te = !1, Be = !1, ae;
    ae = Symbol.for("react.module.reference");
    function Oe(l) {
      return !!(typeof l == "string" || typeof l == "function" || l === d || l === C || Be || l === p || l === g || l === v || Te || l === b || k || O || Ee || typeof l == "object" && l !== null && (l.$$typeof === _ || l.$$typeof === c || l.$$typeof === w || l.$$typeof === j || l.$$typeof === o || // This needs to include all possible module reference object
      // types supported by any Flight configuration anywhere since
      // we don't know which Flight build this will end up being used
      // with.
      l.$$typeof === ae || l.getModuleId !== void 0));
    }
    function Se(l, t, s) {
      var n = l.displayName;
      if (n)
        return n;
      var m = t.displayName || t.name || "";
      return m !== "" ? s + "(" + m + ")" : s;
    }
    function ce(l) {
      return l.displayName || "Context";
    }
    function A(l) {
      if (l == null)
        return null;
      if (typeof l.tag == "number" && u("Received an unexpected object in getComponentNameFromType(). This is likely a bug in React. Please file an issue."), typeof l == "function")
        return l.displayName || l.name || null;
      if (typeof l == "string")
        return l;
      switch (l) {
        case d:
          return "Fragment";
        case a:
          return "Portal";
        case C:
          return "Profiler";
        case p:
          return "StrictMode";
        case g:
          return "Suspense";
        case v:
          return "SuspenseList";
      }
      if (typeof l == "object")
        switch (l.$$typeof) {
          case j:
            var t = l;
            return ce(t) + ".Consumer";
          case w:
            var s = l;
            return ce(s._context) + ".Provider";
          case o:
            return Se(l, l.render, "ForwardRef");
          case c:
            var n = l.displayName || null;
            return n !== null ? n : A(l.type) || "Memo";
          case _: {
            var m = l, L = m._payload, f = m._init;
            try {
              return A(f(L));
            } catch {
              return null;
            }
          }
        }
      return null;
    }
    var E = Object.assign, I = 0, he, oe, de, xe, fe, we, pe;
    function ge() {
    }
    ge.__reactDisabledLog = !0;
    function Fe() {
      {
        if (I === 0) {
          he = console.log, oe = console.info, de = console.warn, xe = console.error, fe = console.group, we = console.groupCollapsed, pe = console.groupEnd;
          var l = {
            configurable: !0,
            enumerable: !0,
            value: ge,
            writable: !0
          };
          Object.defineProperties(console, {
            info: l,
            log: l,
            warn: l,
            error: l,
            group: l,
            groupCollapsed: l,
            groupEnd: l
          });
        }
        I++;
      }
    }
    function Ie() {
      {
        if (I--, I === 0) {
          var l = {
            configurable: !0,
            enumerable: !0,
            writable: !0
          };
          Object.defineProperties(console, {
            log: E({}, l, {
              value: he
            }),
            info: E({}, l, {
              value: oe
            }),
            warn: E({}, l, {
              value: de
            }),
            error: E({}, l, {
              value: xe
            }),
            group: E({}, l, {
              value: fe
            }),
            groupCollapsed: E({}, l, {
              value: we
            }),
            groupEnd: E({}, l, {
              value: pe
            })
          });
        }
        I < 0 && u("disabledDepth fell below zero. This is a bug in React. Please file an issue.");
      }
    }
    var X = h.ReactCurrentDispatcher, q;
    function W(l, t, s) {
      {
        if (q === void 0)
          try {
            throw Error();
          } catch (m) {
            var n = m.stack.trim().match(/\n( *(at )?)/);
            q = n && n[1] || "";
          }
        return `
` + q + l;
      }
    }
    var Q = !1, Y;
    {
      var Ue = typeof WeakMap == "function" ? WeakMap : Map;
      Y = new Ue();
    }
    function ve(l, t) {
      if (!l || Q)
        return "";
      {
        var s = Y.get(l);
        if (s !== void 0)
          return s;
      }
      var n;
      Q = !0;
      var m = Error.prepareStackTrace;
      Error.prepareStackTrace = void 0;
      var L;
      L = X.current, X.current = null, Fe();
      try {
        if (t) {
          var f = function() {
            throw Error();
          };
          if (Object.defineProperty(f.prototype, "props", {
            set: function() {
              throw Error();
            }
          }), typeof Reflect == "object" && Reflect.construct) {
            try {
              Reflect.construct(f, []);
            } catch (N) {
              n = N;
            }
            Reflect.construct(l, [], f);
          } else {
            try {
              f.call();
            } catch (N) {
              n = N;
            }
            l.call(f.prototype);
          }
        } else {
          try {
            throw Error();
          } catch (N) {
            n = N;
          }
          l();
        }
      } catch (N) {
        if (N && n && typeof N.stack == "string") {
          for (var x = N.stack.split(`
`), P = n.stack.split(`
`), H = x.length - 1, M = P.length - 1; H >= 1 && M >= 0 && x[H] !== P[M]; )
            M--;
          for (; H >= 1 && M >= 0; H--, M--)
            if (x[H] !== P[M]) {
              if (H !== 1 || M !== 1)
                do
                  if (H--, M--, M < 0 || x[H] !== P[M]) {
                    var R = `
` + x[H].replace(" at new ", " at ");
                    return l.displayName && R.includes("<anonymous>") && (R = R.replace("<anonymous>", l.displayName)), typeof l == "function" && Y.set(l, R), R;
                  }
                while (H >= 1 && M >= 0);
              break;
            }
        }
      } finally {
        Q = !1, X.current = L, Ie(), Error.prepareStackTrace = m;
      }
      var F = l ? l.displayName || l.name : "", Re = F ? W(F) : "";
      return typeof l == "function" && Y.set(l, Re), Re;
    }
    function $e(l, t, s) {
      return ve(l, !1);
    }
    function De(l) {
      var t = l.prototype;
      return !!(t && t.isReactComponent);
    }
    function z(l, t, s) {
      if (l == null)
        return "";
      if (typeof l == "function")
        return ve(l, De(l));
      if (typeof l == "string")
        return W(l);
      switch (l) {
        case g:
          return W("Suspense");
        case v:
          return W("SuspenseList");
      }
      if (typeof l == "object")
        switch (l.$$typeof) {
          case o:
            return $e(l.render);
          case c:
            return z(l.type, t, s);
          case _: {
            var n = l, m = n._payload, L = n._init;
            try {
              return z(L(m), t, s);
            } catch {
            }
          }
        }
      return "";
    }
    var G = Object.prototype.hasOwnProperty, je = {}, ue = h.ReactDebugCurrentFrame;
    function J(l) {
      if (l) {
        var t = l._owner, s = z(l.type, l._source, t ? t.type : null);
        ue.setExtraStackFrame(s);
      } else
        ue.setExtraStackFrame(null);
    }
    function We(l, t, s, n, m) {
      {
        var L = Function.call.bind(G);
        for (var f in l)
          if (L(l, f)) {
            var x = void 0;
            try {
              if (typeof l[f] != "function") {
                var P = Error((n || "React class") + ": " + s + " type `" + f + "` is invalid; it must be a function, usually from the `prop-types` package, but received `" + typeof l[f] + "`.This often happens because of typos such as `PropTypes.function` instead of `PropTypes.func`.");
                throw P.name = "Invariant Violation", P;
              }
              x = l[f](t, f, n, s, null, "SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED");
            } catch (H) {
              x = H;
            }
            x && !(x instanceof Error) && (J(m), u("%s: type specification of %s `%s` is invalid; the type checker function must return `null` or an `Error` but returned a %s. You may have forgotten to pass an argument to the type checker creator (arrayOf, instanceOf, objectOf, oneOf, oneOfType, and shape all require an argument).", n || "React class", s, f, typeof x), J(null)), x instanceof Error && !(x.message in je) && (je[x.message] = !0, J(m), u("Failed %s type: %s", s, x.message), J(null));
          }
      }
    }
    var Ye = Array.isArray;
    function ee(l) {
      return Ye(l);
    }
    function ze(l) {
      {
        var t = typeof Symbol == "function" && Symbol.toStringTag, s = t && l[Symbol.toStringTag] || l.constructor.name || "Object";
        return s;
      }
    }
    function Ge(l) {
      try {
        return me(l), !1;
      } catch {
        return !0;
      }
    }
    function me(l) {
      return "" + l;
    }
    function Ce(l) {
      if (Ge(l))
        return u("The provided key is an unsupported type %s. This value must be coerced to a string before before using it here.", ze(l)), me(l);
    }
    var U = h.ReactCurrentOwner, Je = {
      key: !0,
      ref: !0,
      __self: !0,
      __source: !0
    }, be, Le, le;
    le = {};
    function Ke(l) {
      if (G.call(l, "ref")) {
        var t = Object.getOwnPropertyDescriptor(l, "ref").get;
        if (t && t.isReactWarning)
          return !1;
      }
      return l.ref !== void 0;
    }
    function Xe(l) {
      if (G.call(l, "key")) {
        var t = Object.getOwnPropertyDescriptor(l, "key").get;
        if (t && t.isReactWarning)
          return !1;
      }
      return l.key !== void 0;
    }
    function qe(l, t) {
      if (typeof l.ref == "string" && U.current && t && U.current.stateNode !== t) {
        var s = A(U.current.type);
        le[s] || (u('Component "%s" contains the string ref "%s". Support for string refs will be removed in a future major release. This case cannot be automatically converted to an arrow function. We ask you to manually fix this case by using useRef() or createRef() instead. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-string-ref', A(U.current.type), l.ref), le[s] = !0);
      }
    }
    function Qe(l, t) {
      {
        var s = function() {
          be || (be = !0, u("%s: `key` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", t));
        };
        s.isReactWarning = !0, Object.defineProperty(l, "key", {
          get: s,
          configurable: !0
        });
      }
    }
    function e1(l, t) {
      {
        var s = function() {
          Le || (Le = !0, u("%s: `ref` is not a prop. Trying to access it will result in `undefined` being returned. If you need to access the same value within the child component, you should pass it as a different prop. (https://reactjs.org/link/special-props)", t));
        };
        s.isReactWarning = !0, Object.defineProperty(l, "ref", {
          get: s,
          configurable: !0
        });
      }
    }
    var l1 = function(l, t, s, n, m, L, f) {
      var x = {
        // This tag allows us to uniquely identify this as a React Element
        $$typeof: i,
        // Built-in properties that belong on the element
        type: l,
        key: t,
        ref: s,
        props: f,
        // Record the component responsible for creating this element.
        _owner: L
      };
      return x._store = {}, Object.defineProperty(x._store, "validated", {
        configurable: !1,
        enumerable: !1,
        writable: !0,
        value: !1
      }), Object.defineProperty(x, "_self", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: n
      }), Object.defineProperty(x, "_source", {
        configurable: !1,
        enumerable: !1,
        writable: !1,
        value: m
      }), Object.freeze && (Object.freeze(x.props), Object.freeze(x)), x;
    };
    function i1(l, t, s, n, m) {
      {
        var L, f = {}, x = null, P = null;
        s !== void 0 && (Ce(s), x = "" + s), Xe(t) && (Ce(t.key), x = "" + t.key), Ke(t) && (P = t.ref, qe(t, m));
        for (L in t)
          G.call(t, L) && !Je.hasOwnProperty(L) && (f[L] = t[L]);
        if (l && l.defaultProps) {
          var H = l.defaultProps;
          for (L in H)
            f[L] === void 0 && (f[L] = H[L]);
        }
        if (x || P) {
          var M = typeof l == "function" ? l.displayName || l.name || "Unknown" : l;
          x && Qe(f, M), P && e1(f, M);
        }
        return l1(l, x, P, m, n, U.current, f);
      }
    }
    var ie = h.ReactCurrentOwner, _e = h.ReactDebugCurrentFrame;
    function S(l) {
      if (l) {
        var t = l._owner, s = z(l.type, l._source, t ? t.type : null);
        _e.setExtraStackFrame(s);
      } else
        _e.setExtraStackFrame(null);
    }
    var re;
    re = !1;
    function te(l) {
      return typeof l == "object" && l !== null && l.$$typeof === i;
    }
    function Ve() {
      {
        if (ie.current) {
          var l = A(ie.current.type);
          if (l)
            return `

Check the render method of \`` + l + "`.";
        }
        return "";
      }
    }
    function r1(l) {
      {
        if (l !== void 0) {
          var t = l.fileName.replace(/^.*[\\\/]/, ""), s = l.lineNumber;
          return `

Check your code at ` + t + ":" + s + ".";
        }
        return "";
      }
    }
    var He = {};
    function t1(l) {
      {
        var t = Ve();
        if (!t) {
          var s = typeof l == "string" ? l : l.displayName || l.name;
          s && (t = `

Check the top-level render call using <` + s + ">.");
        }
        return t;
      }
    }
    function Me(l, t) {
      {
        if (!l._store || l._store.validated || l.key != null)
          return;
        l._store.validated = !0;
        var s = t1(t);
        if (He[s])
          return;
        He[s] = !0;
        var n = "";
        l && l._owner && l._owner !== ie.current && (n = " It was passed a child from " + A(l._owner.type) + "."), S(l), u('Each child in a list should have a unique "key" prop.%s%s See https://reactjs.org/link/warning-keys for more information.', s, n), S(null);
      }
    }
    function ke(l, t) {
      {
        if (typeof l != "object")
          return;
        if (ee(l))
          for (var s = 0; s < l.length; s++) {
            var n = l[s];
            te(n) && Me(n, t);
          }
        else if (te(l))
          l._store && (l._store.validated = !0);
        else if (l) {
          var m = y(l);
          if (typeof m == "function" && m !== l.entries)
            for (var L = m.call(l), f; !(f = L.next()).done; )
              te(f.value) && Me(f.value, t);
        }
      }
    }
    function s1(l) {
      {
        var t = l.type;
        if (t == null || typeof t == "string")
          return;
        var s;
        if (typeof t == "function")
          s = t.propTypes;
        else if (typeof t == "object" && (t.$$typeof === o || // Note: Memo only checks outer props here.
        // Inner props are checked in the reconciler.
        t.$$typeof === c))
          s = t.propTypes;
        else
          return;
        if (s) {
          var n = A(t);
          We(s, l.props, "prop", n, l);
        } else if (t.PropTypes !== void 0 && !re) {
          re = !0;
          var m = A(t);
          u("Component %s declared `PropTypes` instead of `propTypes`. Did you misspell the property assignment?", m || "Unknown");
        }
        typeof t.getDefaultProps == "function" && !t.getDefaultProps.isReactClassApproved && u("getDefaultProps is only used on classic React.createClass definitions. Use a static property named `defaultProps` instead.");
      }
    }
    function n1(l) {
      {
        for (var t = Object.keys(l.props), s = 0; s < t.length; s++) {
          var n = t[s];
          if (n !== "children" && n !== "key") {
            S(l), u("Invalid prop `%s` supplied to `React.Fragment`. React.Fragment can only have `key` and `children` props.", n), S(null);
            break;
          }
        }
        l.ref !== null && (S(l), u("Invalid attribute `ref` supplied to `React.Fragment`."), S(null));
      }
    }
    function Pe(l, t, s, n, m, L) {
      {
        var f = Oe(l);
        if (!f) {
          var x = "";
          (l === void 0 || typeof l == "object" && l !== null && Object.keys(l).length === 0) && (x += " You likely forgot to export your component from the file it's defined in, or you might have mixed up default and named imports.");
          var P = r1(m);
          P ? x += P : x += Ve();
          var H;
          l === null ? H = "null" : ee(l) ? H = "array" : l !== void 0 && l.$$typeof === i ? (H = "<" + (A(l.type) || "Unknown") + " />", x = " Did you accidentally export a JSX literal instead of a component?") : H = typeof l, u("React.jsx: type is invalid -- expected a string (for built-in components) or a class/function (for composite components) but got: %s.%s", H, x);
        }
        var M = i1(l, t, s, m, L);
        if (M == null)
          return M;
        if (f) {
          var R = t.children;
          if (R !== void 0)
            if (n)
              if (ee(R)) {
                for (var F = 0; F < R.length; F++)
                  ke(R[F], l);
                Object.freeze && Object.freeze(R);
              } else
                u("React.jsx: Static children should always be an array. You are likely explicitly calling React.jsxs or React.jsxDEV. Use the Babel transform instead.");
            else
              ke(R, l);
        }
        return l === d ? n1(M) : s1(M), M;
      }
    }
    function a1(l, t, s) {
      return Pe(l, t, s, !0);
    }
    function c1(l, t, s) {
      return Pe(l, t, s, !1);
    }
    var h1 = c1, o1 = a1;
    D.Fragment = d, D.jsx = h1, D.jsxs = o1;
  }()), D;
}
process.env.NODE_ENV === "production" ? se.exports = x1() : se.exports = f1();
var e = se.exports;
const ne = {
  Warning: (r, i) => r ? /* @__PURE__ */ e.jsx(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: /* @__PURE__ */ e.jsx(
        "path",
        {
          d: "M12 5.99L19.53 19H4.47L12 5.99ZM12 2L1 21H23L12 2ZM13 16H11V18H13V16ZM13 10H11V14H13V10Z",
          fill: i ? "#afb0b7" : "white"
        }
      )
    }
  ) : /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
        /* @__PURE__ */ e.jsx("path", { d: "M1 21H23L12 2L1 21ZM13 18H11V16H13V18ZM13 14H11V10H13V14Z", fill: i ? "#afb0b7" : "black" })
      ]
    }
  ),
  Error: (r, i) => r ? /* @__PURE__ */ e.jsx(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: /* @__PURE__ */ e.jsx(
        "path",
        {
          d: "M11 15H13V17H11V15ZM11 7H13V13H11V7ZM11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20Z",
          fill: i ? "#afb0b7" : "white"
        }
      )
    }
  ) : /* @__PURE__ */ e.jsx(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: /* @__PURE__ */ e.jsx(
        "path",
        {
          d: "M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z",
          fill: i ? "#afb0b7" : "black"
        }
      )
    }
  ),
  Checked: (r, i) => r ? /* @__PURE__ */ e.jsxs(
    "svg",
    {
      width: "24",
      height: "24",
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14235)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx(
            "path",
            {
              d: "M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z",
              fill: i ? "#afb0b7" : "white"
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14235", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ) : /* @__PURE__ */ e.jsx(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "xMidYMid meet",
      children: /* @__PURE__ */ e.jsx(
        "path",
        {
          fillRule: "evenodd",
          clipRule: "evenodd",
          d: "M2 12C2 6.48 6.48 2 12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12ZM17.9601 8.95986L18 8.92L16.59 7.5L10 14.09L7.41 11.51L6 12.92L6.04 12.96L10 16.92L17.9601 8.95986Z",
          fill: i ? "#afb0b7" : "black"
        }
      )
    }
  ),
  Add: (r, i) => r ? /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsx("g", { clipPath: "url(#clip0_264_13558)", children: /* @__PURE__ */ e.jsx("path", { d: "M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z", fill: i ? "#afb0b7" : "white" }) }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_264_13558", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ) : /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsx("g", { clipPath: "url(#clip0_264_13558)", children: /* @__PURE__ */ e.jsx("path", { d: "M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z", fill: i ? "#afb0b7" : "black" }) }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_264_13558", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ),
  AddBox: (r, i) => r ? /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14206)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx(
            "path",
            {
              d: "M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM11 17H13V13H17V11H13V7H11V11H7V13H11V17Z",
              fill: i ? "#afb0b7" : "white"
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14206", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ) : /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14206)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx(
            "path",
            {
              d: "M19 3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V5C21 3.9 20.1 3 19 3ZM19 19H5V5H19V19ZM11 17H13V13H17V11H13V7H11V11H7V13H11V17Z",
              fill: i ? "#afb0b7" : "black"
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14206", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ),
  AddCircle: (r, i) => r ? /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsx("g", { clipPath: "url(#clip0_270_14208)", children: /* @__PURE__ */ e.jsx(
          "path",
          {
            d: "M13 7H11V11H7V13H11V17H13V13H17V11H13V7ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z",
            fill: i ? "#afb0b7" : "white"
          }
        ) }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14208", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ) : /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsx("g", { clipPath: "url(#clip0_270_14207)", children: /* @__PURE__ */ e.jsx(
          "path",
          {
            d: "M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 13H13V17H11V13H7V11H11V7H13V11H17V13Z",
            fill: i ? "#afb0b7" : "black"
          }
        ) }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14207", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ),
  Remove: (r, i) => r ? /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14209)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx("path", { d: "M19 13H5V11H19V13Z", fill: i ? "#afb0b7" : "white" })
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14209", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ) : /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14209)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx("path", { d: "M19 13H5V11H19V13Z", fill: i ? "#afb0b7" : "black" })
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14209", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ),
  RemoveCircle: (r, i) => r ? /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsx("g", { clipPath: "url(#clip0_270_14211)", children: /* @__PURE__ */ e.jsx(
          "path",
          {
            d: "M7 11V13H17V11H7ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z",
            fill: i ? "#afb0b7" : "white"
          }
        ) }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14211", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ) : /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsx("g", { clipPath: "url(#clip0_270_14210)", children: /* @__PURE__ */ e.jsx(
          "path",
          {
            d: "M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM17 13H7V11H17V13Z",
            fill: i ? "#afb0b7" : "black"
          }
        ) }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14210", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ),
  Block: (r, i) => r ? /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14212)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx(
            "path",
            {
              d: "M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM4 12C4 7.58 7.58 4 12 4C13.85 4 15.55 4.63 16.9 5.69L5.69 16.9C4.63 15.55 4 13.85 4 12ZM12 20C10.15 20 8.45 19.37 7.1 18.31L18.31 7.1C19.37 8.45 20 10.15 20 12C20 16.42 16.42 20 12 20Z",
              fill: i ? "#afb0b7" : "white"
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14212", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ) : /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14212)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx(
            "path",
            {
              d: "M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM4 12C4 7.58 7.58 4 12 4C13.85 4 15.55 4.63 16.9 5.69L5.69 16.9C4.63 15.55 4 13.85 4 12ZM12 20C10.15 20 8.45 19.37 7.1 18.31L18.31 7.1C19.37 8.45 20 10.15 20 12C20 16.42 16.42 20 12 20Z",
              fill: i ? "#afb0b7" : "black"
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14212", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ),
  ContentCopy: (r, i) => r ? /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsx("g", { clipPath: "url(#clip0_270_14213)", children: /* @__PURE__ */ e.jsx(
          "path",
          {
            d: "M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z",
            fill: i ? "#afb0b7" : "white"
          }
        ) }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14213", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ) : /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsx("g", { clipPath: "url(#clip0_270_14213)", children: /* @__PURE__ */ e.jsx(
          "path",
          {
            d: "M16 1H4C2.9 1 2 1.9 2 3V17H4V3H16V1ZM19 5H8C6.9 5 6 5.9 6 7V21C6 22.1 6.9 23 8 23H19C20.1 23 21 22.1 21 21V7C21 5.9 20.1 5 19 5ZM19 21H8V7H19V21Z",
            fill: i ? "#afb0b7" : "black"
          }
        ) }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14213", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ),
  SaveAlt: (r, i) => r ? /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14214)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx(
            "path",
            {
              d: "M19 12V19H5V12H3V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V12H19ZM13 12.67L15.59 10.09L17 11.5L12 16.5L7 11.5L8.41 10.09L11 12.67V3H13V12.67Z",
              fill: i ? "#afb0b7" : "white"
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14214", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ) : /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14214)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx(
            "path",
            {
              d: "M19 12V19H5V12H3V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V12H19ZM13 12.67L15.59 10.09L17 11.5L12 16.5L7 11.5L8.41 10.09L11 12.67V3H13V12.67Z",
              fill: i ? "#afb0b7" : "black"
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14214", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ),
  Unarchive: (r, i) => r ? /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsx("g", { clipPath: "url(#clip0_270_14215)", children: /* @__PURE__ */ e.jsx(
          "path",
          {
            d: "M20.54 5.23L19.15 3.55C18.88 3.21 18.47 3 18 3H6C5.53 3 5.12 3.21 4.84 3.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V6.5C21 6.02 20.83 5.57 20.54 5.23ZM6.24 5H17.76L18.59 6H5.42L6.24 5ZM5 19V8H19V19H5ZM8 14H10.55V17H13.45V14H16L12 10L8 14Z",
            fill: i ? "#afb0b7" : "white"
          }
        ) }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14215", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ) : /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsx("g", { clipPath: "url(#clip0_270_14215)", children: /* @__PURE__ */ e.jsx(
          "path",
          {
            d: "M20.54 5.23L19.15 3.55C18.88 3.21 18.47 3 18 3H6C5.53 3 5.12 3.21 4.84 3.55L3.46 5.23C3.17 5.57 3 6.02 3 6.5V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V6.5C21 6.02 20.83 5.57 20.54 5.23ZM6.24 5H17.76L18.59 6H5.42L6.24 5ZM5 19V8H19V19H5ZM8 14H10.55V17H13.45V14H16L12 10L8 14Z",
            fill: i ? "#afb0b7" : "black"
          }
        ) }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14215", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ),
  MoreHoriz: (r, i) => r ? /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsx("g", { clipPath: "url(#clip0_270_14216)", children: /* @__PURE__ */ e.jsx(
          "path",
          {
            d: "M6 10C4.9 10 4 10.9 4 12C4 13.1 4.9 14 6 14C7.1 14 8 13.1 8 12C8 10.9 7.1 10 6 10ZM18 10C16.9 10 16 10.9 16 12C16 13.1 16.9 14 18 14C19.1 14 20 13.1 20 12C20 10.9 19.1 10 18 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z",
            fill: i ? "#afb0b7" : "white"
          }
        ) }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14216", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ) : /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsx("g", { clipPath: "url(#clip0_270_14216)", children: /* @__PURE__ */ e.jsx(
          "path",
          {
            d: "M6 10C4.9 10 4 10.9 4 12C4 13.1 4.9 14 6 14C7.1 14 8 13.1 8 12C8 10.9 7.1 10 6 10ZM18 10C16.9 10 16 10.9 16 12C16 13.1 16.9 14 18 14C19.1 14 20 13.1 20 12C20 10.9 19.1 10 18 10ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10Z",
            fill: i ? "#afb0b7" : "black"
          }
        ) }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14216", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ),
  MoreVert: (r, i) => r ? /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsx("g", { clipPath: "url(#clip0_270_14217)", children: /* @__PURE__ */ e.jsx(
          "path",
          {
            d: "M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z",
            fill: i ? "#afb0b7" : "white"
          }
        ) }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14217", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ) : /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsx("g", { clipPath: "url(#clip0_270_14217)", children: /* @__PURE__ */ e.jsx(
          "path",
          {
            d: "M12 8C13.1 8 14 7.1 14 6C14 4.9 13.1 4 12 4C10.9 4 10 4.9 10 6C10 7.1 10.9 8 12 8ZM12 10C10.9 10 10 10.9 10 12C10 13.1 10.9 14 12 14C13.1 14 14 13.1 14 12C14 10.9 13.1 10 12 10ZM12 16C10.9 16 10 16.9 10 18C10 19.1 10.9 20 12 20C13.1 20 14 19.1 14 18C14 16.9 13.1 16 12 16Z",
            fill: i ? "#afb0b7" : "black"
          }
        ) }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14217", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ),
  Menu: (r, i) => r ? /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14218)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx("path", { d: "M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z", fill: i ? "#afb0b7" : "white" })
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14218", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ) : /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14218)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx("path", { d: "M3 18H21V16H3V18ZM3 13H21V11H3V13ZM3 6V8H21V6H3Z", fill: i ? "#afb0b7" : "black" })
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14218", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ),
  Refresh: (r, i) => r ? /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsx("g", { clipPath: "url(#clip0_270_14219)", children: /* @__PURE__ */ e.jsx(
          "path",
          {
            d: "M17.6498 6.35C16.1998 4.9 14.2098 4 11.9998 4C7.57977 4 4.00977 7.58 4.00977 12C4.00977 16.42 7.57977 20 11.9998 20C15.7298 20 18.8398 17.45 19.7298 14H17.6498C16.8298 16.33 14.6098 18 11.9998 18C8.68977 18 5.99977 15.31 5.99977 12C5.99977 8.69 8.68977 6 11.9998 6C13.6598 6 15.1398 6.69 16.2198 7.78L12.9998 11H19.9998V4L17.6498 6.35Z",
            fill: i ? "#afb0b7" : "white"
          }
        ) }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14219", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ) : /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsx("g", { clipPath: "url(#clip0_270_14219)", children: /* @__PURE__ */ e.jsx(
          "path",
          {
            d: "M17.6498 6.35C16.1998 4.9 14.2098 4 11.9998 4C7.57977 4 4.00977 7.58 4.00977 12C4.00977 16.42 7.57977 20 11.9998 20C15.7298 20 18.8398 17.45 19.7298 14H17.6498C16.8298 16.33 14.6098 18 11.9998 18C8.68977 18 5.99977 15.31 5.99977 12C5.99977 8.69 8.68977 6 11.9998 6C13.6598 6 15.1398 6.69 16.2198 7.78L12.9998 11H19.9998V4L17.6498 6.35Z",
            fill: i ? "#afb0b7" : "black"
          }
        ) }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14219", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ),
  Move: (r, i) => r ? /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsx("g", { clipPath: "url(#clip0_270_14220)", children: /* @__PURE__ */ e.jsx(
          "path",
          {
            d: "M12.0002 5.83L15.1702 9L16.5802 7.59L12.0002 3L7.41016 7.59L8.83016 9L12.0002 5.83ZM12.0002 18.17L8.83016 15L7.42016 16.41L12.0002 21L16.5902 16.41L15.1702 15L12.0002 18.17Z",
            fill: i ? "#afb0b7" : "white"
          }
        ) }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14220", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ) : /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsx("g", { clipPath: "url(#clip0_270_14220)", children: /* @__PURE__ */ e.jsx(
          "path",
          {
            d: "M12.0002 5.83L15.1702 9L16.5802 7.59L12.0002 3L7.41016 7.59L8.83016 9L12.0002 5.83ZM12.0002 18.17L8.83016 15L7.42016 16.41L12.0002 21L16.5902 16.41L15.1702 15L12.0002 18.17Z",
            fill: i ? "#afb0b7" : "black"
          }
        ) }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14220", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ),
  South: (r, i) => r ? /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsx("g", { clipPath: "url(#clip0_270_14221)", children: /* @__PURE__ */ e.jsx(
          "path",
          {
            d: "M19 15L17.59 13.59L13 18.17V2H11V18.17L6.41 13.58L5 15L12 22L19 15Z",
            fill: i ? "#afb0b7" : "white"
          }
        ) }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14221", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ) : /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsx("g", { clipPath: "url(#clip0_270_14221)", children: /* @__PURE__ */ e.jsx(
          "path",
          {
            d: "M19 15L17.59 13.59L13 18.17V2H11V18.17L6.41 13.58L5 15L12 22L19 15Z",
            fill: i ? "#afb0b7" : "black"
          }
        ) }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14221", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ),
  North: (r, i) => r ? /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14222)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx(
            "path",
            {
              d: "M5 9L6.41 10.41L11 5.83V22H13V5.83L17.59 10.42L19 9L12 2L5 9Z",
              fill: i ? "#afb0b7" : "white"
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14222", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ) : /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14222)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx(
            "path",
            {
              d: "M5 9L6.41 10.41L11 5.83V22H13V5.83L17.59 10.42L19 9L12 2L5 9Z",
              fill: i ? "#afb0b7" : "black"
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14222", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ),
  West: (r, i) => r ? /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsx("g", { clipPath: "url(#clip0_270_14223)", children: /* @__PURE__ */ e.jsx(
          "path",
          {
            d: "M9 19L10.41 17.59L5.83 13H22V11H5.83L10.42 6.41L9 5L2 12L9 19Z",
            fill: i ? "#afb0b7" : "white"
          }
        ) }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14223", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ) : /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsx("g", { clipPath: "url(#clip0_270_14223)", children: /* @__PURE__ */ e.jsx(
          "path",
          {
            d: "M9 19L10.41 17.59L5.83 13H22V11H5.83L10.42 6.41L9 5L2 12L9 19Z",
            fill: i ? "#afb0b7" : "black"
          }
        ) }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14223", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ),
  ExpandMore: (r, i) => r ? /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsx("g", { clipPath: "url(#clip0_270_14230)", children: /* @__PURE__ */ e.jsx(
          "path",
          {
            d: "M16.59 8.58984L12 13.1698L7.41 8.58984L6 9.99984L12 15.9998L18 9.99984L16.59 8.58984Z",
            fill: i ? "#afb0b7" : "white"
          }
        ) }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14230", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ) : /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsx("g", { clipPath: "url(#clip0_270_14230)", children: /* @__PURE__ */ e.jsx(
          "path",
          {
            d: "M16.59 8.58984L12 13.1698L7.41 8.58984L6 9.99984L12 15.9998L18 9.99984L16.59 8.58984Z",
            fill: i ? "#afb0b7" : "black"
          }
        ) }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14230", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ),
  ExpandLess: (r, i) => r ? /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsx("g", { clipPath: "url(#clip0_270_14229)", children: /* @__PURE__ */ e.jsx("path", { d: "M12 8L6 14L7.41 15.41L12 10.83L16.59 15.41L18 14L12 8Z", fill: i ? "#afb0b7" : "white" }) }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14229", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ) : /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsx("g", { clipPath: "url(#clip0_270_14229)", children: /* @__PURE__ */ e.jsx("path", { d: "M12 8L6 14L7.41 15.41L12 10.83L16.59 15.41L18 14L12 8Z", fill: i ? "#afb0b7" : "black" }) }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14229", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ),
  Close: (r, i) => r ? /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsx("g", { clipPath: "url(#clip0_270_14231)", children: /* @__PURE__ */ e.jsx(
          "path",
          {
            d: "M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z",
            fill: i ? "#afb0b7" : "white"
          }
        ) }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14231", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ) : /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsx("g", { clipPath: "url(#clip0_270_14231)", children: /* @__PURE__ */ e.jsx(
          "path",
          {
            d: "M19 6.41L17.59 5L12 10.59L6.41 5L5 6.41L10.59 12L5 17.59L6.41 19L12 13.41L17.59 19L19 17.59L13.41 12L19 6.41Z",
            fill: i ? "#afb0b7" : "black"
          }
        ) }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14231", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ),
  Cancel: (r, i) => r ? /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsx("g", { clipPath: "url(#clip0_270_14232)", children: /* @__PURE__ */ e.jsx(
          "path",
          {
            d: "M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z",
            fill: i ? "#afb0b7" : "white"
          }
        ) }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14232", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ) : /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsx("g", { clipPath: "url(#clip0_270_14232)", children: /* @__PURE__ */ e.jsx(
          "path",
          {
            d: "M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z",
            fill: i ? "#afb0b7" : "black"
          }
        ) }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14232", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ),
  Delete: (r, i) => r ? /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsx("g", { clipPath: "url(#clip0_270_14233)", children: /* @__PURE__ */ e.jsx(
          "path",
          {
            d: "M16 9V19H8V9H16ZM14.5 3H9.5L8.5 4H5V6H19V4H15.5L14.5 3ZM18 7H6V19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7Z",
            fill: i ? "#afb0b7" : "white"
          }
        ) }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14233", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ) : /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsx("g", { clipPath: "url(#clip0_270_14233)", children: /* @__PURE__ */ e.jsx(
          "path",
          {
            d: "M16 9V19H8V9H16ZM14.5 3H9.5L8.5 4H5V6H19V4H15.5L14.5 3ZM18 7H6V19C6 20.1 6.9 21 8 21H16C17.1 21 18 20.1 18 19V7Z",
            fill: i ? "#afb0b7" : "black"
          }
        ) }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14233", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ),
  FilterAlt: (r, i) => r ? /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsx("g", { clipPath: "url(#clip0_270_14234)", children: /* @__PURE__ */ e.jsx(
          "path",
          {
            d: "M7.00067 6H17.0007L11.9907 12.3L7.00067 6ZM4.25067 5.61C6.27067 8.2 10.0007 13 10.0007 13V19C10.0007 19.55 10.4507 20 11.0007 20H13.0007C13.5507 20 14.0007 19.55 14.0007 19V13C14.0007 13 17.7207 8.2 19.7407 5.61C20.2507 4.95 19.7807 4 18.9507 4H5.04067C4.21067 4 3.74067 4.95 4.25067 5.61Z",
            fill: i ? "#afb0b7" : "white"
          }
        ) }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14234", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ) : /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsx("g", { clipPath: "url(#clip0_270_14234)", children: /* @__PURE__ */ e.jsx(
          "path",
          {
            d: "M7.00067 6H17.0007L11.9907 12.3L7.00067 6ZM4.25067 5.61C6.27067 8.2 10.0007 13 10.0007 13V19C10.0007 19.55 10.4507 20 11.0007 20H13.0007C13.5507 20 14.0007 19.55 14.0007 19V13C14.0007 13 17.7207 8.2 19.7407 5.61C20.2507 4.95 19.7807 4 18.9507 4H5.04067C4.21067 4 3.74067 4.95 4.25067 5.61Z",
            fill: i ? "#afb0b7" : "black"
          }
        ) }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14234", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ),
  Edit: (r, i) => r ? /* @__PURE__ */ e.jsx(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: /* @__PURE__ */ e.jsx(
        "path",
        {
          d: "M18.4141 2C18.1581 2 17.902 2.09797 17.707 2.29297L15.707 4.29297L14.293 5.70703L3 17V21H7L21.707 6.29297C22.098 5.90197 22.098 5.26891 21.707 4.87891L19.1211 2.29297C18.9261 2.09797 18.6701 2 18.4141 2ZM18.4141 4.41406L19.5859 5.58594L18.293 6.87891L17.1211 5.70703L18.4141 4.41406ZM15.707 7.12109L16.8789 8.29297L6.17188 19H5V17.8281L15.707 7.12109Z",
          fill: i ? "#afb0b7" : "white"
        }
      )
    }
  ) : /* @__PURE__ */ e.jsx(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: /* @__PURE__ */ e.jsx(
        "path",
        {
          d: "M18.4141 2C18.1581 2 17.902 2.09797 17.707 2.29297L15.707 4.29297L14.293 5.70703L3 17V21H7L21.707 6.29297C22.098 5.90197 22.098 5.26891 21.707 4.87891L19.1211 2.29297C18.9261 2.09797 18.6701 2 18.4141 2ZM18.4141 4.41406L19.5859 5.58594L18.293 6.87891L17.1211 5.70703L18.4141 4.41406ZM15.707 7.12109L16.8789 8.29297L6.17188 19H5V17.8281L15.707 7.12109Z",
          fill: i ? "#afb0b7" : "black"
        }
      )
    }
  ),
  CheckCircle: (r, i) => r ? /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14235)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx(
            "path",
            {
              d: "M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z",
              fill: i ? "#afb0b7" : "white"
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14235", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ) : /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14235)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx(
            "path",
            {
              d: "M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM16.59 7.58L10 14.17L7.41 11.59L6 13L10 17L18 9L16.59 7.58Z",
              fill: i ? "#afb0b7" : "black"
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14235", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ),
  CalendarToday: (r, i) => r ? /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14237)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx(
            "path",
            {
              d: "M20 3H19V1H17V3H7V1H5V3H4C2.9 3 2 3.9 2 5V21C2 22.1 2.9 23 4 23H20C21.1 23 22 22.1 22 21V5C22 3.9 21.1 3 20 3ZM20 21H4V10H20V21ZM20 8H4V5H20V8Z",
              fill: i ? "#afb0b7" : "white"
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14237", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ) : /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14237)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx(
            "path",
            {
              d: "M20 3H19V1H17V3H7V1H5V3H4C2.9 3 2 3.9 2 5V21C2 22.1 2.9 23 4 23H20C21.1 23 22 22.1 22 21V5C22 3.9 21.1 3 20 3ZM20 21H4V10H20V21ZM20 8H4V5H20V8Z",
              fill: i ? "#afb0b7" : "black"
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14237", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ),
  AccountCircle: (r, i) => r ? /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14238)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx(
            "path",
            {
              d: "M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM7.07 18.28C7.5 17.38 10.12 16.5 12 16.5C13.88 16.5 16.51 17.38 16.93 18.28C15.57 19.36 13.86 20 12 20C10.14 20 8.43 19.36 7.07 18.28ZM18.36 16.83C16.93 15.09 13.46 14.5 12 14.5C10.54 14.5 7.07 15.09 5.64 16.83C4.62 15.49 4 13.82 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 13.82 19.38 15.49 18.36 16.83ZM12 6C10.06 6 8.5 7.56 8.5 9.5C8.5 11.44 10.06 13 12 13C13.94 13 15.5 11.44 15.5 9.5C15.5 7.56 13.94 6 12 6ZM12 11C11.17 11 10.5 10.33 10.5 9.5C10.5 8.67 11.17 8 12 8C12.83 8 13.5 8.67 13.5 9.5C13.5 10.33 12.83 11 12 11Z",
              fill: i ? "#afb0b7" : "white"
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14238", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ) : /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14238)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx(
            "path",
            {
              d: "M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM7.07 18.28C7.5 17.38 10.12 16.5 12 16.5C13.88 16.5 16.51 17.38 16.93 18.28C15.57 19.36 13.86 20 12 20C10.14 20 8.43 19.36 7.07 18.28ZM18.36 16.83C16.93 15.09 13.46 14.5 12 14.5C10.54 14.5 7.07 15.09 5.64 16.83C4.62 15.49 4 13.82 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 13.82 19.38 15.49 18.36 16.83ZM12 6C10.06 6 8.5 7.56 8.5 9.5C8.5 11.44 10.06 13 12 13C13.94 13 15.5 11.44 15.5 9.5C15.5 7.56 13.94 6 12 6ZM12 11C11.17 11 10.5 10.33 10.5 9.5C10.5 8.67 11.17 8 12 8C12.83 8 13.5 8.67 13.5 9.5C13.5 10.33 12.83 11 12 11Z",
              fill: i ? "#afb0b7" : "black"
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14238", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ),
  Done: (r, i) => r ? /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14241)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx(
            "path",
            {
              d: "M9.00039 16.2001L4.80039 12.0001L3.40039 13.4001L9.00039 19.0001L21.0004 7.0001L19.6004 5.6001L9.00039 16.2001Z",
              fill: i ? "#afb0b7" : "white"
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14241", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ) : /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14241)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx(
            "path",
            {
              d: "M9.00039 16.2001L4.80039 12.0001L3.40039 13.4001L9.00039 19.0001L21.0004 7.0001L19.6004 5.6001L9.00039 16.2001Z",
              fill: i ? "#afb0b7" : "black"
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14241", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ),
  LogIn: (r, i) => r ? /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14243)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx(
            "path",
            {
              d: "M11 7L9.6 8.4L12.2 11H2V13H12.2L9.6 15.6L11 17L16 12L11 7ZM20 19H12V21H20C21.1 21 22 20.1 22 19V5C22 3.9 21.1 3 20 3H12V5H20V19Z",
              fill: i ? "#afb0b7" : "white"
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14243", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ) : /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14243)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx(
            "path",
            {
              d: "M11 7L9.6 8.4L12.2 11H2V13H12.2L9.6 15.6L11 17L16 12L11 7ZM20 19H12V21H20C21.1 21 22 20.1 22 19V5C22 3.9 21.1 3 20 3H12V5H20V19Z",
              fill: i ? "#afb0b7" : "black"
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14243", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ),
  OpenWith: (r, i) => r ? /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14244)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx(
            "path",
            {
              d: "M10 9H14V6H17L12 1L7 6H10V9ZM9 10H6V7L1 12L6 17V14H9V10ZM23 12L18 7V10H15V14H18V17L23 12ZM14 15H10V18H7L12 23L17 18H14V15Z",
              fill: i ? "#afb0b7" : "white"
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14244", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ) : /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14244)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx(
            "path",
            {
              d: "M10 9H14V6H17L12 1L7 6H10V9ZM9 10H6V7L1 12L6 17V14H9V10ZM23 12L18 7V10H15V14H18V17L23 12ZM14 15H10V18H7L12 23L17 18H14V15Z",
              fill: i ? "#afb0b7" : "black"
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14244", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ),
  Search: (r, i) => r ? /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14247)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx(
            "path",
            {
              d: "M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z",
              fill: i ? "#afb0b7" : "white"
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14247", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ) : /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14247)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx(
            "path",
            {
              d: "M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14Z",
              fill: i ? "#afb0b7" : "black"
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14247", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ),
  Info: (r, i) => r ? /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14250)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx(
            "path",
            {
              d: "M11 7H13V9H11V7ZM11 11H13V17H11V11ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z",
              fill: i ? "#afb0b7" : "white"
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14250", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ) : /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14250)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx(
            "path",
            {
              d: "M11 7H13V9H11V7ZM11 11H13V17H11V11ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z",
              fill: i ? "#afb0b7" : "black"
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14250", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ),
  Help: (r, i) => r ? /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14267)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx(
            "path",
            {
              d: "M11 18H13V16H11V18ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 6C9.79 6 8 7.79 8 10H10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 12 11 11.75 11 15H13C13 12.75 16 12.5 16 10C16 7.79 14.21 6 12 6Z",
              fill: i ? "#afb0b7" : "white"
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14267", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ) : /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14267)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx(
            "path",
            {
              d: "M11 18H13V16H11V18ZM12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM12 6C9.79 6 8 7.79 8 10H10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 12 11 11.75 11 15H13C13 12.75 16 12.5 16 10C16 7.79 14.21 6 12 6Z",
              fill: i ? "#afb0b7" : "black"
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14267", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ),
  KeyboardArrowLeft: (r, i) => r ? /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14268)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx(
            "path",
            {
              d: "M15.41 16.59L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.59Z",
              fill: i ? "#afb0b7" : "white"
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14268", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ) : /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14268)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx(
            "path",
            {
              d: "M15.41 16.59L10.83 12L15.41 7.41L14 6L8 12L14 18L15.41 16.59Z",
              fill: i ? "#afb0b7" : "black"
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14268", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ),
  KeyboardArrowRight: (r, i) => r ? /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14269)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx(
            "path",
            {
              d: "M8.58984 16.59L13.1698 12L8.58984 7.41L9.99984 6L15.9998 12L9.99984 18L8.58984 16.59Z",
              fill: i ? "#afb0b7" : "white"
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14269", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ) : /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14269)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx(
            "path",
            {
              d: "M8.58984 16.59L13.1698 12L8.58984 7.41L9.99984 6L15.9998 12L9.99984 18L8.58984 16.59Z",
              fill: i ? "#afb0b7" : "black"
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14269", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ),
  DownloadDone: (r, i) => r ? /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14251)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx(
            "path",
            {
              d: "M5 18H19V20H5V18ZM9.6 15.3L5 10.7L7 8.8L9.6 11.4L17 4L19 6L9.6 15.3Z",
              fill: i ? "#afb0b7" : "white"
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14251", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ) : /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14251)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx(
            "path",
            {
              d: "M5 18H19V20H5V18ZM9.6 15.3L5 10.7L7 8.8L9.6 11.4L17 4L19 6L9.6 15.3Z",
              fill: i ? "#afb0b7" : "black"
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14251", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ),
  Place: (r, i) => r ? /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsx("g", { clipPath: "url(#clip0_463_5630)", children: /* @__PURE__ */ e.jsx(
          "path",
          {
            d: "M12 12C10.9 12 10 11.1 10 10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 11.1 13.1 12 12 12ZM18 10.2C18 6.57 15.35 4 12 4C8.65 4 6 6.57 6 10.2C6 12.54 7.95 15.64 12 19.34C16.05 15.64 18 12.54 18 10.2ZM12 2C16.2 2 20 5.22 20 10.2C20 13.52 17.33 17.45 12 22C6.67 17.45 4 13.52 4 10.2C4 5.22 7.8 2 12 2Z",
            fill: i ? "#afb0b7" : "white"
          }
        ) }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_463_5630", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ) : /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsx("g", { clipPath: "url(#clip0_463_5630)", children: /* @__PURE__ */ e.jsx(
          "path",
          {
            d: "M12 12C10.9 12 10 11.1 10 10C10 8.9 10.9 8 12 8C13.1 8 14 8.9 14 10C14 11.1 13.1 12 12 12ZM18 10.2C18 6.57 15.35 4 12 4C8.65 4 6 6.57 6 10.2C6 12.54 7.95 15.64 12 19.34C16.05 15.64 18 12.54 18 10.2ZM12 2C16.2 2 20 5.22 20 10.2C20 13.52 17.33 17.45 12 22C6.67 17.45 4 13.52 4 10.2C4 5.22 7.8 2 12 2Z",
            fill: i ? "#afb0b7" : "black"
          }
        ) }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_463_5630", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ),
  OpenInNew: (r, i) => r ? /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14260)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx(
            "path",
            {
              d: "M19 19H5V5H12V3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V12H19V19ZM14 3V5H17.59L7.76 14.83L9.17 16.24L19 6.41V10H21V3H14Z",
              fill: i ? "#afb0b7" : "white"
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14260", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ) : /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14260)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx(
            "path",
            {
              d: "M19 19H5V5H12V3H5C3.89 3 3 3.9 3 5V19C3 20.1 3.89 21 5 21H19C20.1 21 21 20.1 21 19V12H19V19ZM14 3V5H17.59L7.76 14.83L9.17 16.24L19 6.41V10H21V3H14Z",
              fill: i ? "#afb0b7" : "black"
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14260", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ),
  Schedule: (r, i) => r ? /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14261)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx(
            "path",
            {
              d: "M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z",
              fill: i ? "#afb0b7" : "white"
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14261", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ) : /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14261)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx(
            "path",
            {
              d: "M11.99 2C6.47 2 2 6.48 2 12C2 17.52 6.47 22 11.99 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 11.99 2ZM12 20C7.58 20 4 16.42 4 12C4 7.58 7.58 4 12 4C16.42 4 20 7.58 20 12C20 16.42 16.42 20 12 20ZM12.5 7H11V13L16.25 16.15L17 14.92L12.5 12.25V7Z",
              fill: i ? "#afb0b7" : "black"
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14261", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ),
  ZoomIn: (r, i) => r ? /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14263)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx(
            "path",
            {
              d: "M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14ZM10 7H9V9H7V10H9V12H10V10H12V9H10V7Z",
              fill: i ? "#afb0b7" : "white"
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14263", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ) : /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14263)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx(
            "path",
            {
              d: "M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14ZM10 7H9V9H7V10H9V12H10V10H12V9H10V7Z",
              fill: i ? "#afb0b7" : "black"
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14263", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ),
  ZoomOut: (r, i) => r ? /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14264)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx(
            "path",
            {
              d: "M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14ZM7 9H12V10H7V9Z",
              fill: i ? "#afb0b7" : "white"
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14264", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ) : /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      fill: "none",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      preserveAspectRatio: "none",
      children: [
        /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14264)", children: [
          /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }),
          /* @__PURE__ */ e.jsx(
            "path",
            {
              d: "M15.5 14H14.71L14.43 13.73C15.41 12.59 16 11.11 16 9.5C16 5.91 13.09 3 9.5 3C5.91 3 3 5.91 3 9.5C3 13.09 5.91 16 9.5 16C11.11 16 12.59 15.41 13.73 14.43L14 14.71V15.5L19 20.49L20.49 19L15.5 14ZM9.5 14C7.01 14 5 11.99 5 9.5C5 7.01 7.01 5 9.5 5C11.99 5 14 7.01 14 9.5C14 11.99 11.99 14 9.5 14ZM7 9H12V10H7V9Z",
              fill: i ? "#afb0b7" : "black"
            }
          )
        ] }),
        /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14264", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "" }) }) })
      ]
    }
  ),
  Photo: (r, i) => r ? /* @__PURE__ */ e.jsxs(
    "svg",
    {
      xmlns: "http://www.w3.org/2000/svg",
      height: "24px",
      viewBox: "0 0 24 24",
      width: "24px",
      fill: i ? "#afb0b7" : "white",
      children: [
        /* @__PURE__ */ e.jsx("path", { d: "M0 0h24v24H0V0z", fill: "none" }),
        /* @__PURE__ */ e.jsx("path", { d: "M18 20H4V6h9V4H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9h-2v9zm-7.79-3.17l-1.96-2.36L5.5 18h11l-3.54-4.71zM20 4V1h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V6h3V4h-3z" })
      ]
    }
  ) : /* @__PURE__ */ e.jsxs(
    "svg",
    {
      viewBox: "0 0 24 24",
      xmlns: "http://www.w3.org/2000/svg",
      className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
      fill: i ? "#afb0b7" : "black",
      children: [
        /* @__PURE__ */ e.jsx("path", { d: "M0 0h24v24H0V0z", fill: "none" }),
        /* @__PURE__ */ e.jsx("path", { d: "M18 20H4V6h9V4H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-9h-2v9zm-7.79-3.17l-1.96-2.36L5.5 18h11l-3.54-4.71zM20 4V1h-2v3h-3c.01.01 0 2 0 2h3v2.99c.01.01 2 0 2 0V6h3V4h-3z" })
      ]
    }
  )
}, m1 = {
  DEFAULT: "default",
  HOVERED: "hovered",
  FOCUSED: "focused",
  PRESSED: "pressed",
  ICON: "icon",
  ICONPLUS: "iconplus",
  OUTLINED: "outlined"
}, C1 = {
  DEFAULT: "default"
}, Ne = {
  DEFAULT: "bg-[#000000] hover:bg-[#373940] active:bg-[#26282d] h-12 text-white border border-1 border-transparent",
  HOVERED: "bg-[#373940] active:bg-[#26282d] h-12 text-white border border-1 border-transparent",
  FOCUSED: "bg-[#000000] hover:bg-[#373940] active:bg-[#26282d] h-12 text-white border border-1 border-transparent",
  PRESSED: "bg-[#000000] hover:bg-[#373940] active:bg-[#26282d] h-12 text-white border border-1 border-transparent",
  ICON: "bg-transparent h-[1.5em] h-[2.5em]",
  ICONPLUS: "bg-[#000000] hover:bg-[#373940] active:bg-[#26282d] h-12 text-white border border-1 border-transparent",
  OUTLINED: "bg-[#ffffff] hover:bg-[#f0eff1] active:bg-[#e9e8ea] h-12 text-black border border-1 border-black"
}, b1 = ({
  label: r,
  variant: i = "DEFAULT",
  isDisabled: a = !1,
  isOutlined: d = !1,
  onClick: p,
  children: C,
  type: w,
  customClasses: j,
  iconName: o = "Block"
}) => /* @__PURE__ */ e.jsx(
  "button",
  {
    type: w,
    className: `flex flex-col items-center transition-color duration-100 
      justify-center gap-2 overflow-hidden rounded
      ${a ? d ? "bg-[#ffffff] h-12 cursor-not-allowed pointer-events-none text-[#afb0b7] border border-1 border-[#afb0b7]" : "bg-[#e9e8ea] h-12 cursor-not-allowed pointer-events-none text-[#afb0b7] border border-1 border-transparent" : d ? Ne.OUTLINED : Ne[i]}
      ${j}`,
    onClick: p,
    children: i == "ICON" ? /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx("div", { className: "p-[0.5em]", children: C || /* @__PURE__ */ e.jsx("span", { children: ne[o](d == !1, a == !0) }) }) }) : /* @__PURE__ */ e.jsxs("div", { className: "flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2 px-6 py-2.5", children: [
      i == "ICONPLUS" && /* @__PURE__ */ e.jsx("span", { children: ne[o](d == !1, a == !0) }),
      /* @__PURE__ */ e.jsx(
        "p",
        {
          className: `flex-grow-0 flex-shrink-0 text-[0.8750em] text-center 
            `,
          children: C || r
        }
      )
    ] })
  }
), L1 = {
  DEFAULT: "default"
}, w1 = {
  DEFAULT: "flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-2.5 transition-all duration-400 rounded border border-1 border-[#373940] hover:outline outline-offset-0 outline-1"
}, _1 = ({
  placeholder: r,
  label: i,
  variant: a = "DEFAULT",
  isDisabled: d = !1,
  isError: p = !1,
  onChange: C,
  value: w,
  name: j,
  type: o,
  id: g,
  supportingText: v,
  isRequired: c
}) => {
  const [_, b] = Z(w || "");
  K(() => {
    b(w || "");
  }, [w]);
  const T = (k) => {
    const { value: O } = k.target;
    b(O), C && C(k);
  }, B = () => {
    b("");
  }, [y, h] = Z(!1), u = () => {
    h(!y);
  }, V = `h-[3.1em] w-full transition-colors px-[0.9em] hover:px-[0.9em] py-2 rounded-md 
  ${c || p ? "border-red-500" : ""} 
  ${w1[a]} ${d ? "cursor-not-allowed pointer-events-none" : ""}`;
  return /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsxs(
    "div",
    {
      className: `relative flex flex-col items-start justify-start 
        flex-grow-0 flex-shrink-0 w-full bg-white rounded-tl rounded-tr h-14 
        ${d && "opacity-[0.3] cursor-not-allowed pointer-events-none"}`,
      children: [
        i && /* @__PURE__ */ e.jsx("div", { className: "absolute label top-[-0.5em] left-[0.7em] flex items-center rounded justify-start px-1 bg-white", children: /* @__PURE__ */ e.jsx("p", { className: `text-xs text-left ${c || p ? "text-red-500" : "text-black"}`, children: i || "label" }) }),
        /* @__PURE__ */ e.jsx(
          "input",
          {
            id: g,
            value: _,
            name: j,
            type: y ? "text" : o,
            onChange: T,
            placeholder: r,
            className: V,
            style: { WebkitAppearance: "none", appearance: "none" }
          }
        ),
        /* @__PURE__ */ e.jsxs(
          "div",
          {
            style: { background: "white" },
            className: `flex justify-center items-center h-[2em] mt-[0.6em] mr-[0.1em]
            flex-grow-0 flex-shrink-0 absolute gap-2.5 pl-[1em] pr-2 right-0`,
            children: [
              o == "password" && /* @__PURE__ */ e.jsx("button", { onClick: (k) => {
                k.preventDefault(), u();
              }, className: "show-password", children: y ? /* @__PURE__ */ e.jsx(
                "svg",
                {
                  width: "24",
                  height: "24",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  preserveAspectRatio: "none",
                  children: /* @__PURE__ */ e.jsx(
                    "path",
                    {
                      d: "M12 6c3.79 0 7.17 2.13 8.82 5.5-.59 1.22-1.42 2.27-2.41 3.12l1.41 1.41c1.39-1.23 2.49-2.77 3.18-4.53C21.27 7.11 17 4 12 4c-1.27 0-2.49.2-3.64.57l1.65 1.65C10.66 6.09 11.32 6 12 6m-1.07 1.14L13 9.21c.57.25 1.03.71 1.28 1.28l2.07 2.07c.08-.34.14-.7.14-1.07C16.5 9.01 14.48 7 12 7c-.37 0-.72.05-1.07.14M2.01 3.87l2.68 2.68C3.06 7.83 1.77 9.53 1 11.5 2.73 15.89 7 19 12 19c1.52 0 2.98-.29 4.32-.82l3.42 3.42 1.41-1.41L3.42 2.45zm7.5 7.5 2.61 2.61c-.04.01-.08.02-.12.02-1.38 0-2.5-1.12-2.5-2.5 0-.05.01-.08.01-.13m-3.4-3.4 1.75 1.75c-.23.55-.36 1.15-.36 1.78 0 2.48 2.02 4.5 4.5 4.5.63 0 1.23-.13 1.77-.36l.98.98c-.88.24-1.8.38-2.75.38-3.79 0-7.17-2.13-8.82-5.5.7-1.43 1.72-2.61 2.93-3.53",
                      fill: "#000000"
                    }
                  )
                }
              ) : /* @__PURE__ */ e.jsx(
                "svg",
                {
                  width: "24",
                  height: "24",
                  viewBox: "0 0 24 24",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  preserveAspectRatio: "none",
                  children: /* @__PURE__ */ e.jsx(
                    "path",
                    {
                      d: "M12 6c3.79 0 7.17 2.13 8.82 5.5C19.17 14.87 15.79 17 12 17s-7.17-2.13-8.82-5.5C4.83 8.13 8.21 6 12 6m0-2C7 4 2.73 7.11 1 11.5 2.73 15.89 7 19 12 19s9.27-3.11 11-7.5C21.27 7.11 17 4 12 4m0 5c1.38 0 2.5 1.12 2.5 2.5S13.38 14 12 14s-2.5-1.12-2.5-2.5S10.62 9 12 9m0-2c-2.48 0-4.5 2.02-4.5 4.5S9.52 16 12 16s4.5-2.02 4.5-4.5S14.48 7 12 7",
                      fill: "#000000"
                    }
                  )
                }
              ) }),
              p ? /* @__PURE__ */ e.jsx("div", { onClick: B, className: "hover:cursor-pointer", children: /* @__PURE__ */ e.jsx(
                "svg",
                {
                  width: "20",
                  height: "20",
                  viewBox: "0 0 20 20",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  preserveAspectRatio: "none",
                  children: /* @__PURE__ */ e.jsx(
                    "path",
                    {
                      d: "M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z",
                      fill: "#D10411"
                    }
                  )
                }
              ) }) : /* @__PURE__ */ e.jsx("div", { onClick: B, className: "hover:cursor-pointer", children: /* @__PURE__ */ e.jsxs(
                "svg",
                {
                  viewBox: "0 0 24 24",
                  fill: "none",
                  xmlns: "http://www.w3.org/2000/svg",
                  className: "relative flex-grow-0 flex-shrink-0 w-6 h-6 bg-white",
                  preserveAspectRatio: "none",
                  children: [
                    /* @__PURE__ */ e.jsx("g", { clipPath: "url(#clip0_626_352)", children: /* @__PURE__ */ e.jsx(
                      "path",
                      {
                        d: "M12 2C6.47 2 2 6.47 2 12C2 17.53 6.47 22 12 22C17.53 22 22 17.53 22 12C22 6.47 17.53 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20ZM15.59 7L12 10.59L8.41 7L7 8.41L10.59 12L7 15.59L8.41 17L12 13.41L15.59 17L17 15.59L13.41 12L17 8.41L15.59 7Z",
                        className: c ? "fill-red-500" : "fill-black"
                      }
                    ) }),
                    /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_626_352", children: /* @__PURE__ */ e.jsx("rect", { width: 24, height: 24, fill: "white" }) }) })
                  ]
                }
              ) })
            ]
          }
        ),
        v && /* @__PURE__ */ e.jsx(
          "p",
          {
            className: `flex-grow w-[178px] text-xs text-left text-[#52555e] ml-[1em] mt-[0.1em]
          bg-white px-[0.5em] ${c || p ? "text-red-500" : "text-black"}`,
            children: v || "supportingText"
          }
        )
      ]
    }
  ) });
}, V1 = {
  DEFAULT: "default"
}, H1 = {
  DEFAULT: "bg-black hover:bg-black-800 active:bg-grey-900"
}, M1 = ({
  options: r,
  selectedCatOptions: i,
  setSelectedCatOptions: a,
  variant: d = "DEFAULT"
}) => {
  const [p, C] = Z(null), w = {}, j = r, o = (h) => {
    const u = h.classId.split("_")[0], V = parseInt(u.split(".")[0]);
    return V < 200 ? h.groupName = "Patros" : V < 300 ? h.groupName = "Reius" : V < 500 ? h.groupName = "Caius" : V < 600 ? h.groupName = "Verkehrslenkungstafeln" : V < 721 ? h.groupName = "Ranta" : h.groupName = "Lorem", h;
  }, g = j.map((h) => o(h));
  Object.values(g).forEach((h) => {
    w[h.groupName] || (w[h.groupName] = []), w[h.groupName].push(h);
  });
  const v = (h) => {
    C((u) => u === h ? null : h);
  }, c = (h) => {
    const u = i.indexOf(h);
    if (u === -1)
      a([...i, h]);
    else {
      const V = [...i];
      V.splice(u, 1), a(V);
    }
  }, [_, b] = Z(!1), T = (h) => {
    const u = h.map((V) => V.id);
    if (u.every((V) => i.includes(V))) {
      const V = i.filter((k) => !u.includes(k));
      b(!1), a(V);
    } else
      b(!0), a([...i, ...u]);
  }, B = (h) => i && i.includes(h), y = ["Reius", "Caius", "Patros", "Ranta", "Lorem", "Andere"];
  return /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsx("div", { className: "w-full overflow-hidden border rounded border-brand-black", children: Object.keys(w).map((h) => {
    const u = w[h], V = h === p;
    return /* @__PURE__ */ e.jsxs(
      "div",
      {
        className: `relative ${V ? "h-[15em]" : "h-[3.5em]"} accordion-item w-full flex-col py-4 
                        justify-start items-start overflow-hidden gap-2.5 border-b last:border-b-0 bg-brand-white 
                        hover:cursor-pointer focus:outline-none focus:border-blue-500 transition-all duration-700`,
        children: [
          /* @__PURE__ */ e.jsx("div", { className: "bg-brand-white h-[2.5em] px-4 border-b", onClick: () => v(h), children: y.find((k) => k === h) || "Andere" }),
          /* @__PURE__ */ e.jsx(
            "div",
            {
              className: "flex px-[1em] py-[0.3em] w-[10.5em] justify-between",
              onClick: () => {
                T(u);
              },
              children: _ ? /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                /* @__PURE__ */ e.jsx("p", { className: "text-semibold", children: "Alle entfernen" }),
                /* @__PURE__ */ e.jsxs(
                  "svg",
                  {
                    width: 24,
                    height: 24,
                    viewBox: "0 0 24 24",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
                    preserveAspectRatio: "none",
                    children: [
                      /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_270_14209)", children: [
                        /* @__PURE__ */ e.jsx("rect", { width: 24, height: 24, fill: "white" }),
                        /* @__PURE__ */ e.jsx("path", { d: "M19 13H5V11H19V13Z", fill: "black" })
                      ] }),
                      /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_270_14209", children: /* @__PURE__ */ e.jsx("rect", { width: 24, height: 24, fill: "white" }) }) })
                    ]
                  }
                )
              ] }) : /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
                /* @__PURE__ */ e.jsx("p", { className: "text-semibold", children: "Alle auswählen" }),
                /* @__PURE__ */ e.jsxs(
                  "svg",
                  {
                    width: 24,
                    height: 24,
                    viewBox: "0 0 24 24",
                    fill: "none",
                    xmlns: "http://www.w3.org/2000/svg",
                    className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
                    preserveAspectRatio: "none",
                    children: [
                      /* @__PURE__ */ e.jsxs("g", { clipPath: "url(#clip0_264_13558)", children: [
                        /* @__PURE__ */ e.jsx("rect", { width: 24, height: 24, fill: "white" }),
                        /* @__PURE__ */ e.jsx("path", { d: "M19 13H13V19H11V13H5V11H11V5H13V11H19V13Z", fill: "black" })
                      ] }),
                      /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_264_13558", children: /* @__PURE__ */ e.jsx("rect", { width: 24, height: 24, fill: "white" }) }) })
                    ]
                  }
                )
              ] })
            }
          ),
          /* @__PURE__ */ e.jsx("div", { className: `pb-[4em] bg-[#f0eff1] overflow-scroll ${V ? "h-[15em]" : "h-[3.5em]"}`, children: u.slice().sort((k, O) => k.name && O.name ? k.name.localeCompare(O.name) : 0).map((k) => /* @__PURE__ */ e.jsx(
            "div",
            {
              className: `px-4 py-[0.5em] border-b border-[#d8e6f2] transition-all hover:bg-slate-200 ${B(k.id) ? "bg-blue-100" : ""}`,
              onClick: () => c(k.id),
              children: k.name
            },
            k.id
          )) }),
          /* @__PURE__ */ e.jsx("div", { className: "absolute inset-y-0 right-0 flex items-start pt-[1em] top-0 px-2 text-gray-700 pointer-events-none", children: /* @__PURE__ */ e.jsx("div", { children: V ? /* @__PURE__ */ e.jsx("div", { className: "transition-all rotate-0 duration-600", children: /* @__PURE__ */ e.jsxs(
            "svg",
            {
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
              preserveAspectRatio: "none",
              children: [
                /* @__PURE__ */ e.jsx("g", { clipPath: "url(#clip0_626_593)", children: /* @__PURE__ */ e.jsx("path", { d: "M12 8L6 14L7.41 15.41L12 10.83L16.59 15.41L18 14L12 8Z", fill: "black" }) }),
                /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_626_593", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "white" }) }) })
              ]
            }
          ) }) : /* @__PURE__ */ e.jsx("div", { className: "transition-all -rotate-180 duration-600", children: /* @__PURE__ */ e.jsxs(
            "svg",
            {
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
              preserveAspectRatio: "none",
              children: [
                /* @__PURE__ */ e.jsx("g", { clipPath: "url(#clip0_626_593)", children: /* @__PURE__ */ e.jsx("path", { d: "M12 8L6 14L7.41 15.41L12 10.83L16.59 15.41L18 14L12 8Z", fill: "black" }) }),
                /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_626_593", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "white" }) }) })
              ]
            }
          ) }) }) })
        ]
      },
      h
    );
  }) }) });
}, k1 = {
  DEFAULT: "primary"
}, P1 = {
  DEFAULT: "bg-yellow-200 hover-bg-green-400 active-bg-green-500"
}, p1 = ({
  placeholder: r,
  label: i,
  isDisabled: a = !1,
  isError: d = !1,
  isRequired: p = !1,
  onChange: C,
  checked: w,
  id: j,
  readOnly: o
}) => {
  const [g, v] = Z(w || !1), [c, _] = Z(!1);
  return K(() => {
    v(w || !1);
  }, [w]), /* @__PURE__ */ e.jsxs(
    "div",
    {
      className: `relative flex items-start justify-start gap-2 ${a ? "opacity-50 pointer-events-none" : ""} bg-red`,
      children: [
        /* @__PURE__ */ e.jsxs(
          "svg",
          {
            width: 20,
            height: 20,
            viewBox: "0 0 20 20",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            className: `relative flex-grow-0 flex-shrink-0 w-5 h-5 ${g ? "text-black" : "text-white"}`,
            preserveAspectRatio: "none",
            children: [
              /* @__PURE__ */ e.jsx(
                "rect",
                {
                  x: "0.5",
                  y: "0.5",
                  width: 19,
                  height: 19,
                  rx: "0",
                  fill: "white",
                  stroke: d || p ? "#e2001a" : c ? "black" : "#AFB0B7",
                  strokeWidth: c ? 3 : 1
                }
              ),
              (g || w) && /* @__PURE__ */ e.jsx("path", { d: "M13.9887 5L8.28867 10.8L5.78867 8.3L3.88867 10.1L8.28867 14.5L15.8887 6.9L13.9887 5Z", fill: "black" })
            ]
          }
        ),
        i && /* @__PURE__ */ e.jsx(
          "p",
          {
            className: `flex items-center flex-grow-0 flex-shrink-0 w-auto h-5 text-base text-left 
                    ${d || p ? "text-[#e2001a]" : "text-black"}`,
            children: i
          }
        ),
        /* @__PURE__ */ e.jsx(
          "input",
          {
            type: "checkbox",
            id: j,
            checked: g,
            onChange: (b) => {
              v(b.target.checked), C && C(b);
            },
            readOnly: o,
            className: "h-[1.2em] w-[1.2em] absolute opacity-0 cursor-pointer",
            onMouseEnter: () => _(!0),
            onMouseLeave: () => _(!1)
          }
        )
      ]
    }
  );
}, R1 = {
  DEFAULT: "default"
}, Z1 = {
  DEFAULT: "bg-black hover:bg-black-800 active:bg-grey-900"
}, A1 = ({ label: r, isDisabled: i, variant: a = "DEFAULT", onClick: d }) => /* @__PURE__ */ e.jsx(
  "button",
  {
    className: `justify-start items-start h-8 overflow-hidden rounded-lg bg-[#d8e6f2] hover:bg-[#c2d6e7] 
      transition-colors duration-300 w-auto inline-block ${i && "opacity-[0.3] cursor-not-allowed pointer-events-none"}`,
    onClick: d,
    children: /* @__PURE__ */ e.jsxs("div", { className: "flex justify-center items-center flex-grow-0 flex-shrink-0 relative gap-2 pl-3 pr-2 py-1.5", children: [
      /* @__PURE__ */ e.jsx("p", { className: "flex-grow-0 flex-shrink-0 text-sm font-medium text-center text-black", children: r }),
      /* @__PURE__ */ e.jsxs(
        "svg",
        {
          viewBox: "0 0 18 18",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          className: "flex-grow-0 flex-shrink-0 w-[18px] h-[18px] relative",
          preserveAspectRatio: "xMidYMid meet",
          children: [
            /* @__PURE__ */ e.jsx("g", { clipPath: "url(#clip0_412_1849)", children: /* @__PURE__ */ e.jsx(
              "path",
              {
                d: "M14.25 4.8075L13.1925 3.75L9 7.9425L4.8075 3.75L3.75 4.8075L7.9425 9L3.75 13.1925L4.8075 14.25L9 10.0575L13.1925 14.25L14.25 13.1925L10.0575 9L14.25 4.8075Z",
                fill: "black"
              }
            ) }),
            /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_412_1849", children: /* @__PURE__ */ e.jsx("rect", { width: 18, height: 18, fill: "white" }) }) })
          ]
        }
      )
    ] })
  }
), N1 = {
  DEFAULT: "primary"
}, y1 = {
  DEFAULT: "bg-yellow-200 hover-bg-green-400 active-bg-green-500"
}, E1 = ({
  placeholder: r,
  label: i,
  isDisabled: a = !1,
  isError: d = !1,
  isRequired: p = !1,
  onChange: C,
  checked: w,
  id: j,
  readOnly: o
}) => {
  const [g, v] = Z(w || !1), [c, _] = Z(!1);
  return K(() => {
    v(w || !1);
  }, [w]), /* @__PURE__ */ e.jsxs(
    "div",
    {
      className: `relative flex items-start justify-start gap-2 ${a ? "opacity-50 pointer-events-none" : ""} bg-red`,
      children: [
        /* @__PURE__ */ e.jsxs(
          "svg",
          {
            width: 20,
            height: 20,
            viewBox: "0 0 20 20",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            className: `relative flex-grow-0 flex-shrink-0 w-5 h-5 ${g ? "text-black" : "text-white"}`,
            preserveAspectRatio: "none",
            children: [
              /* @__PURE__ */ e.jsx(
                "rect",
                {
                  x: "0.5",
                  y: "0.5",
                  width: 19,
                  height: 19,
                  rx: "10",
                  fill: "white",
                  stroke: d || p ? "#e2001a" : c ? "black" : "#AFB0B7",
                  strokeWidth: 1
                }
              ),
              c && /* @__PURE__ */ e.jsx("circle", { cx: 10, cy: 10, r: 6, fill: "lightgrey" }),
              g && /* @__PURE__ */ e.jsx("circle", { cx: 10, cy: 10, r: 6, fill: g ? "black" : "white" })
            ]
          }
        ),
        i && /* @__PURE__ */ e.jsx(
          "p",
          {
            className: `flex items-center flex-grow-0 flex-shrink-0 w-auto h-5 text-base text-left 
        ${d || p ? "text-[#e2001a]" : "text-black"}`,
            children: i
          }
        ),
        /* @__PURE__ */ e.jsx(
          "input",
          {
            type: "checkbox",
            id: j,
            checked: g,
            onChange: (b) => {
              v(b.target.checked), C && C(b);
            },
            readOnly: o,
            className: "h-[1.2em] w-[1.2em] absolute opacity-0 cursor-pointer",
            onMouseEnter: () => _(!0),
            onMouseLeave: () => _(!1)
          }
        )
      ]
    }
  );
}, T1 = {
  DEFAULT: "default"
}, B1 = {
  DEFAULT: "bg-black hover:bg-black-800 active:bg-grey-900"
}, O1 = ({
  id: r,
  options: i,
  selectedOptions: a,
  onSelectionChange: d,
  label: p,
  prepopulatedId: C,
  boxText: w,
  isDisabled: j,
  topPull: o
}) => {
  const [g, v] = Z(!1), c = () => {
    v(!g);
  }, _ = () => {
    g && v(!1);
  };
  return /* @__PURE__ */ e.jsxs(
    "div",
    {
      className: `flex flex-col relative justify-start items-start h-[3.1em] 
                self-stretch cursor-pointer gap-2.5 rounded border border-black 
                ${j ? "bg-brand-grey-light pointer-events-none" : "bg-brand-white pointer-events-auto"}`,
      onMouseLeave: _,
      onClick: c,
      children: [
        /* @__PURE__ */ e.jsx(
          "div",
          {
            className: `absolute top-[-0.5em] left-[0.7em] flex items-center rounded justify-start px-1 bg-white 
        ${o && g ? "opacity-0" : "opacity-100"}`,
            children: /* @__PURE__ */ e.jsx("p", { className: "text-xs text-left text-black", children: p })
          }
        ),
        /* @__PURE__ */ e.jsxs("div", { className: "flex items-center self-stretch justify-start py-1 pl-4 rounded-tl rounded-tr", children: [
          /* @__PURE__ */ e.jsx("div", { className: "overflow-hidden", children: /* @__PURE__ */ e.jsx("div", { className: "my-2 text-base text-left text-black dropdown-header h-[1.6em] w-[40em]", children: w || a }) }),
          /* @__PURE__ */ e.jsx("div", { className: "flex justify-center items-center ml-auto relative gap-2.5 p-2", children: g ? /* @__PURE__ */ e.jsx("div", { className: "transition-all rotate-0 duration-600", children: /* @__PURE__ */ e.jsxs(
            "svg",
            {
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
              preserveAspectRatio: "none",
              children: [
                /* @__PURE__ */ e.jsx("g", { clipPath: "url(#clip0_626_593)", children: /* @__PURE__ */ e.jsx("path", { d: "M12 8L6 14L7.41 15.41L12 10.83L16.59 15.41L18 14L12 8Z", fill: "black" }) }),
                /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_626_593", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "white" }) }) })
              ]
            }
          ) }) : /* @__PURE__ */ e.jsx("div", { className: "transition-all -rotate-180 duration-600", children: /* @__PURE__ */ e.jsxs(
            "svg",
            {
              viewBox: "0 0 24 24",
              fill: "none",
              xmlns: "http://www.w3.org/2000/svg",
              className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
              preserveAspectRatio: "none",
              children: [
                /* @__PURE__ */ e.jsx("g", { clipPath: "url(#clip0_626_593)", children: /* @__PURE__ */ e.jsx("path", { d: "M12 8L6 14L7.41 15.41L12 10.83L16.59 15.41L18 14L12 8Z", fill: "black" }) }),
                /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_626_593", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "white" }) }) })
              ]
            }
          ) }) })
        ] }),
        /* @__PURE__ */ e.jsx(
          "div",
          {
            className: `dropdown-list absolute  w-full overflow-hidden rounded-b ${o ? "-mt-[13.05em]" : ""}
          transition-all duration-100 ${g ? "h-[13em]" : "h-[0em] pointer-events-none"}`,
            children: g && /* @__PURE__ */ e.jsx(
              "ul",
              {
                id: r,
                className: `dropdown-list overflow-y-auto overflow-x-hidden absolute max-h-[10em]
                        bg-brand-white z-10 w-[110%] top-[3.1em]`,
                children: i == null ? void 0 : i.map((b) => /* @__PURE__ */ e.jsx(
                  "li",
                  {
                    className: `flex items-start justify-center h-10 py-1 pl-4 flex-col 
                            bg-[#f0eff1] w-[91%] last:rounded-b last:border-transparent  
                            border-b border-[#d8e6f2] transition duration-200 delay-10 hover:bg-slate-100`,
                    value: b.id,
                    title: b.name || b.carId || b.loginUsername,
                    onClick: () => {
                      d(b);
                    },
                    children: /* @__PURE__ */ e.jsx("p", { className: "w-[50em]", children: b.name || b.carId || b.loginUsername || b.value })
                  },
                  b.id
                ))
              }
            )
          }
        )
      ]
    }
  );
}, S1 = {
  DEFAULT: "default"
}, F1 = {
  DEFAULT: "bg-black hover:bg-black-800 active:bg-grey-900"
}, I1 = ({
  id: r,
  selectedOptions: i,
  onSelectionChange: a,
  options: d,
  isDisabled: p,
  label: C,
  variant: w = "DEFAULT"
}) => {
  const [j, o] = Z(!1), g = d1(null), v = () => {
    j && o(!1);
  };
  return /* @__PURE__ */ e.jsxs(
    "div",
    {
      onMouseLeave: v,
      onClick: () => {
        o(!0);
      },
      className: `cursor-pointer relative py-[0.7em] px-[1em] border border-black rounded h-[3.1em]
                ${p ? "bg-brand-grey-light pointer-events-none" : "bg-brand-white pointer-events-auto"}`,
      children: [
        /* @__PURE__ */ e.jsx("div", { className: "absolute top-[-0.5em] left-[0.7em] flex items-center rounded justify-start px-1 bg-white", children: /* @__PURE__ */ e.jsx("p", { className: "text-xs text-left text-black", children: C }) }),
        /* @__PURE__ */ e.jsx("p", { children: "Auswählen" }),
        /* @__PURE__ */ e.jsx("div", { className: "flex justify-center items-center ml-auto absolute top-[0.2em] right-0 gap-2.5 p-2", children: j ? /* @__PURE__ */ e.jsx("div", { className: "transition-all rotate-0 duration-600", children: /* @__PURE__ */ e.jsxs(
          "svg",
          {
            viewBox: "0 0 24 24",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
            preserveAspectRatio: "none",
            children: [
              /* @__PURE__ */ e.jsx("g", { clipPath: "url(#clip0_626_593)", children: /* @__PURE__ */ e.jsx("path", { d: "M12 8L6 14L7.41 15.41L12 10.83L16.59 15.41L18 14L12 8Z", fill: "black" }) }),
              /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_626_593", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "white" }) }) })
            ]
          }
        ) }) : /* @__PURE__ */ e.jsx("div", { className: "transition-all -rotate-180 duration-600", children: /* @__PURE__ */ e.jsxs(
          "svg",
          {
            viewBox: "0 0 24 24",
            fill: "none",
            xmlns: "http://www.w3.org/2000/svg",
            className: "relative flex-grow-0 flex-shrink-0 w-6 h-6",
            preserveAspectRatio: "none",
            children: [
              /* @__PURE__ */ e.jsx("g", { clipPath: "url(#clip0_626_593)", children: /* @__PURE__ */ e.jsx("path", { d: "M12 8L6 14L7.41 15.41L12 10.83L16.59 15.41L18 14L12 8Z", fill: "black" }) }),
              /* @__PURE__ */ e.jsx("defs", { children: /* @__PURE__ */ e.jsx("clipPath", { id: "clip0_626_593", children: /* @__PURE__ */ e.jsx("rect", { width: "24", height: "24", fill: "white" }) }) })
            ]
          }
        ) }) }),
        /* @__PURE__ */ e.jsx(
          "div",
          {
            className: `overflow-hidden w-full ${j ? "h-[15em]" : "h-[0em]"} absolute ml-[-1em] mt-[0.85em] rounded-b`,
            children: /* @__PURE__ */ e.jsx(
              "ul",
              {
                id: "status",
                className: `${j ? "h-[15em] opacity-100 z-10" : "h-[0em] opacity-0 z-0"}
                    bg-[#f0eff1] rounded-b left-0 top-[0em] cursor-pointer overflow-y-auto overflow-x-hidden
                    absolute w-[110%] outline-none focus:border-red-500`,
                ref: g,
                children: d.map((c) => {
                  const _ = i.includes(c.id) || i.includes(c.carId) || i.includes(c);
                  return /* @__PURE__ */ e.jsxs(
                    "li",
                    {
                      className: `border-b border-[#d8e6f2] px-[1em] flex items-center min-w-[20em] max-w-[90%] last:border-transparent justify-between
                            py-1 h-10 m-0 ${_ ? "bg-[#d8e6f2]" : ""} hover:bg-slate-100`,
                      title: c.name || c.carId || c.loginUsername,
                      onClick: () => {
                        a(c);
                      },
                      children: [
                        c.name || c.carId || c.loginUsername,
                        /* @__PURE__ */ e.jsx("div", { className: "mr-[0em]", children: /* @__PURE__ */ e.jsx(p1, { id: "test", checked: _, onChange: () => a(c) }) })
                      ]
                    },
                    c.id
                  );
                })
              }
            )
          }
        )
      ]
    }
  );
}, U1 = {
  DEFAULT: "default",
  IMPORTANT: "important",
  SMALL: "small"
}, g1 = {
  DEFAULT: "text-[1em]",
  IMPORTANT: "text-[1.125em]",
  SMALL: "text-[0.8750em]"
}, $1 = ({
  variant: r = "DEFAULT",
  isDisabled: i = !1,
  text: a,
  children: d,
  bold: p,
  small: C,
  important: w,
  customClasses: j,
  title: o
}) => /* @__PURE__ */ e.jsx(
  "p",
  {
    title: o,
    className: `${g1[r]} ${p ? "font-semibold" : ""} ${j || ""} ${i ? "opacity-[0.3] cursor-not-allowed pointer-events-none" : ""}`,
    children: d || a
  }
), D1 = {
  DEFAULT: "default"
}, v1 = {
  DEFAULT: "flex flex-col justify-start items-start self-stretch flex-grow-0 flex-shrink-0 gap-2.5 transition-all duration-400 rounded border border-1 border-[#373940] hover:outline outline-offset-0 outline-1"
}, W1 = ({
  value: r,
  placeholder: i,
  label: a,
  variant: d = "DEFAULT",
  isDisabled: p = !1,
  isError: C = !1,
  defaultValue: w,
  isRequired: j,
  onChange: o,
  supportingText: g,
  id: v
}) => {
  const c = `h-[3.1em] w-full transition-colors px-[0.9em] hover:px-[0.9em] py-[0.7em] rounded-md 
  ${j || C ? "border-red-500" : ""} 
  ${v1[d]} ${p ? "cursor-not-allowed pointer-events-none" : ""}`;
  return /* @__PURE__ */ e.jsx(e.Fragment, { children: /* @__PURE__ */ e.jsxs(
    "div",
    {
      className: `relative flex flex-col items-start justify-start w-full rounded-tl rounded-tr
       ${p && "opacity-[0.3] cursor-not-allowed pointer-events-none"}`,
      children: [
        a && /* @__PURE__ */ e.jsx("div", { className: "absolute label top-[-0.5em] left-[0.7em] h-[1em] flex items-center rounded justify-start px-1 bg-white", children: /* @__PURE__ */ e.jsx("p", { className: `text-xs text-left ${j || C ? "text-red-500" : "text-black"}`, children: a || "label" }) }),
        /* @__PURE__ */ e.jsx(
          "textarea",
          {
            id: v,
            value: r,
            defaultValue: w,
            placeholder: i,
            onChange: o,
            className: c
          }
        ),
        g && /* @__PURE__ */ e.jsx(
          "p",
          {
            className: `flex-grow w-[178px] h-[1em] text-[1em] text-left ml-[1em] mt-[0.1em]
             px-[0.5em] ${j || C ? "text-red-500" : "text-black"}`,
            children: g || "supportingText"
          }
        )
      ]
    }
  ) });
}, Y1 = {
  DEFAULT: "default"
}, z1 = {
  DEFAULT: "bg-black hover:bg-black-800 active:bg-grey-900"
}, G1 = ({ variant: r = "DEFAULT", isDisabled: i = !1, children: a }) => /* @__PURE__ */ e.jsx(
  "div",
  {
    className: `overflow-hidden rounded-lg bg-white shadow-[0px_0px_8px_0px_rgba(0,0,0,0.05)]  
                flex`,
    children: a || "test"
  }
), J1 = {
  DEFAULT: "default"
}, K1 = ({ children: r, onClick: i, width: a, height: d, customClasses: p }) => (K(() => (document.body.style.overflow = "hidden", () => {
  document.body.style.overflow = "unset";
}), []), /* @__PURE__ */ e.jsxs(e.Fragment, { children: [
  /* @__PURE__ */ e.jsx(
    "div",
    {
      onClick: i,
      className: "fixed inset-0 z-50 transition-opacity bg-black bg-opacity-60",
      style: { opacity: "0.6" }
    }
  ),
  /* @__PURE__ */ e.jsx(
    "div",
    {
      className: `fixed z-50 p-8 overflow-hidden bg-white
        -translate-x-1/2 -translate-y-1/2 border border-white rounded-md top-1/2 left-1/2
        ${p}`,
      style: { width: `${a || ""}`, height: `${d || ""}` },
      children: r || "test"
    }
  )
] })), X1 = {
  h1: "h1",
  h2: "h2",
  h3: "h3"
}, j1 = {
  h1: "text-black text-[3em]",
  h2: "text-black text-[2.25em]",
  h3: "text-black text-[1.625em]"
}, q1 = ({ variant: r = "h1", children: i, bold: a, label: d, customClasses: p }) => {
  const C = r === "h2" ? "h2" : r === "h3" ? "h3" : "h1";
  return /* @__PURE__ */ e.jsx(C, { className: `${j1[r]} ${a ? "font-semibold" : "font-normal"} ${p}`, children: i || d });
}, Q1 = {
  DEFAULT: "default"
}, el = {
  DEFAULT: "bg-black hover:bg-black-800 active:bg-grey-900"
}, ll = ({ name: r, isOutlined: i, isDisabled: a }) => /* @__PURE__ */ e.jsx("div", { children: /* @__PURE__ */ e.jsx("span", { children: ne[r](i == !1, a == !0) }) }), il = () => /* @__PURE__ */ e.jsx("div", { children: "Banner" }), rl = () => /* @__PURE__ */ e.jsx("div", { children: "Footer" });
export {
  V1 as ACCORDION_VARIANT,
  M1 as Accordion,
  Y1 as BOX_VARIANT,
  m1 as BUTTON_VARIANT,
  G1 as Box,
  b1 as Button,
  k1 as CHECKBOX_VARIANT,
  p1 as Checkbox,
  R1 as FILTERCHIP_VARIANT,
  A1 as FilterChip,
  X1 as HEADING_VARIANT,
  q1 as Heading,
  C1 as ICONBUTTON_VARIANT,
  Q1 as ICON_VARIANT,
  L1 as INPUT_VARIANT,
  ll as Icon,
  _1 as Input,
  J1 as MODAL_VARIANT,
  S1 as MULTISELECT_VARIANT,
  il as MlBanner,
  K1 as Modal,
  I1 as MultiSelect,
  rl as OrFooter,
  N1 as RADIO_VARIANT,
  E1 as Radio,
  T1 as SELECT_VARIANT,
  O1 as Select,
  D1 as TEXTAREA_VARIANT,
  U1 as TEXT_VARIANT,
  $1 as Text,
  W1 as Textarea,
  H1 as accordionVariant,
  z1 as boxVariant,
  Ne as buttonVariant,
  P1 as checkboxVariant,
  Z1 as filterChipVariant,
  j1 as headingVariant,
  el as iconVariant,
  w1 as inputVariant,
  F1 as multiSelectVariant,
  y1 as radioboxVariant,
  B1 as selectVariant,
  g1 as textVariant,
  v1 as textarea
};
