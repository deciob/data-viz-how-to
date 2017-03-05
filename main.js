(function () {
'use strict';

function __$styleInject(css, returnValue) {
  if (typeof document === 'undefined') {
    return returnValue;
  }
  css = css || '';
  var head = document.head || document.getElementsByTagName('head')[0];
  var style = document.createElement('style');
  style.type = 'text/css';
  if (style.styleSheet){
    style.styleSheet.cssText = css;
  } else {
    style.appendChild(document.createTextNode(css));
  }
  head.appendChild(style);
  return returnValue;
}

__$styleInject("/*! normalize.css v5.0.0 | MIT License | github.com/necolas/normalize.css */html{font-family:sans-serif;line-height:1.15;-ms-text-size-adjust:100%;-webkit-text-size-adjust:100%}body{margin:0}article,aside,footer,header,nav,section{display:block}h1{font-size:2em;margin:.67em 0}figcaption,figure,main{display:block}figure{margin:1em 40px}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent;-webkit-text-decoration-skip:objects}a:active,a:hover{outline-width:0}abbr[title]{border-bottom:none;text-decoration:underline;text-decoration:underline dotted}b,strong{font-weight:inherit;font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}dfn{font-style:italic}mark{background-color:#ff0;color:#000}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}audio,video{display:inline-block}audio:not([controls]){display:none;height:0}img{border-style:none}svg:not(:root){overflow:hidden}button,input,optgroup,select,textarea{font-family:sans-serif;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}[type=reset],[type=submit],button,html [type=button]{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{border:1px solid silver;margin:0 2px;padding:.35em .625em .75em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{display:inline-block;vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-cancel-button,[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details,menu{display:block}summary{display:list-item}canvas{display:inline-block}[hidden],template{display:none}",undefined);

__$styleInject("h1{color:red}",undefined);

var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};





function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var rlite = createCommonjsModule(function (module) {
// This library started as an experiment to see how small I could make
// a functional router. It has since been optimized (and thus grown).
// The redundancy and inelegance here is for the sake of either size
// or speed.
(function (root, factory) {
  var define = root && root.define;

  if (define && define.amd) {
    define('rlite', [], factory);
  } else if ('object' !== 'undefined' && module.exports) {
    module.exports = factory();
  } else {
    root.Rlite = factory();
  }
}(commonjsGlobal, function () {
  return function (notFound, routeDefinitions) {
    var routes = {};
    var decode = decodeURIComponent;

    init();

    return run;

    function init() {
      for (var key in routeDefinitions) {
        add(key, routeDefinitions[key]);
      }
    }

    function noop(s) { return s; }

    function sanitize(url) {
      ~url.indexOf('/?') && (url = url.replace('/?', '?'));
      url[0] == '/' && (url = url.slice(1));
      url[url.length - 1] == '/' && (url = url.slice(0, -1));

      return url;
    }

    function processUrl(url, esc) {
      var pieces = url.split('/'),
          rules = routes,
          params = {};

      for (var i = 0; i < pieces.length && rules; ++i) {
        var piece = esc(pieces[i]);
        rules = rules[piece.toLowerCase()] || rules[':'];
        rules && rules['~'] && (params[rules['~']] = piece);
      }

      return rules && {
        cb: rules['@'],
        params: params
      };
    }

    function processQuery(url, ctx, esc) {
      if (url && ctx.cb) {
        var hash = url.indexOf('#'),
            query = (hash < 0 ? url : url.slice(0, hash)).split('&');

        for (var i = 0; i < query.length; ++i) {
          var nameValue = query[i].split('=');

          ctx.params[nameValue[0]] = esc(nameValue[1]);
        }
      }

      return ctx;
    }

    function lookup(url) {
      var querySplit = sanitize(url).split('?');
      var esc = ~url.indexOf('%') ? decode : noop;

      return processQuery(querySplit[1], processUrl(querySplit[0], esc) || {}, esc);
    }

    function add(route, handler) {
      var pieces = route.split('/');
      var rules = routes;

      for (var i = +(route[0] === '/'); i < pieces.length; ++i) {
        var piece = pieces[i];
        var name = piece[0] == ':' ? ':' : piece.toLowerCase();

        rules = rules[name] || (rules[name] = {});

        name == ':' && (rules['~'] = piece.slice(1));
      }

      rules['@'] = handler;
    }

    function run(url, arg) {
      var result = lookup(url);

      return (result.cb || notFound)(result.params, arg, url);
    }
  };
}));
});

const route = rlite(notFound, {
  // Default route
  '': function () {
    return 'Home';
  },

  // #inbox
  'inbox': function () {
    return 'Inbox';
  },

  // #sent?to=john -> r.params.to will equal 'john'
  'sent': function ({ to }) {
    return 'Sent to ' + to;
  },

  // #users/chris -> r.params.name will equal 'chris'
  'users/:name': function ({ name }) {
    return 'User ' + name;
  },

  // #logout
  'logout': function () {
    return 'Logout';
  },
});

function notFound () {
  return '<h1>404 Not found :/</h1>';
}

}());
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsibm9kZV9tb2R1bGVzL3JsaXRlLXJvdXRlci9ybGl0ZS5qcyIsInNyYy9qcy9tYWluLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoaXMgbGlicmFyeSBzdGFydGVkIGFzIGFuIGV4cGVyaW1lbnQgdG8gc2VlIGhvdyBzbWFsbCBJIGNvdWxkIG1ha2Vcbi8vIGEgZnVuY3Rpb25hbCByb3V0ZXIuIEl0IGhhcyBzaW5jZSBiZWVuIG9wdGltaXplZCAoYW5kIHRodXMgZ3Jvd24pLlxuLy8gVGhlIHJlZHVuZGFuY3kgYW5kIGluZWxlZ2FuY2UgaGVyZSBpcyBmb3IgdGhlIHNha2Ugb2YgZWl0aGVyIHNpemVcbi8vIG9yIHNwZWVkLlxuKGZ1bmN0aW9uIChyb290LCBmYWN0b3J5KSB7XG4gIHZhciBkZWZpbmUgPSByb290ICYmIHJvb3QuZGVmaW5lO1xuXG4gIGlmIChkZWZpbmUgJiYgZGVmaW5lLmFtZCkge1xuICAgIGRlZmluZSgncmxpdGUnLCBbXSwgZmFjdG9yeSk7XG4gIH0gZWxzZSBpZiAodHlwZW9mIG1vZHVsZSAhPT0gJ3VuZGVmaW5lZCcgJiYgbW9kdWxlLmV4cG9ydHMpIHtcbiAgICBtb2R1bGUuZXhwb3J0cyA9IGZhY3RvcnkoKTtcbiAgfSBlbHNlIHtcbiAgICByb290LlJsaXRlID0gZmFjdG9yeSgpO1xuICB9XG59KHRoaXMsIGZ1bmN0aW9uICgpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uIChub3RGb3VuZCwgcm91dGVEZWZpbml0aW9ucykge1xuICAgIHZhciByb3V0ZXMgPSB7fTtcbiAgICB2YXIgZGVjb2RlID0gZGVjb2RlVVJJQ29tcG9uZW50O1xuXG4gICAgaW5pdCgpO1xuXG4gICAgcmV0dXJuIHJ1bjtcblxuICAgIGZ1bmN0aW9uIGluaXQoKSB7XG4gICAgICBmb3IgKHZhciBrZXkgaW4gcm91dGVEZWZpbml0aW9ucykge1xuICAgICAgICBhZGQoa2V5LCByb3V0ZURlZmluaXRpb25zW2tleV0pO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBmdW5jdGlvbiBub29wKHMpIHsgcmV0dXJuIHM7IH1cblxuICAgIGZ1bmN0aW9uIHNhbml0aXplKHVybCkge1xuICAgICAgfnVybC5pbmRleE9mKCcvPycpICYmICh1cmwgPSB1cmwucmVwbGFjZSgnLz8nLCAnPycpKTtcbiAgICAgIHVybFswXSA9PSAnLycgJiYgKHVybCA9IHVybC5zbGljZSgxKSk7XG4gICAgICB1cmxbdXJsLmxlbmd0aCAtIDFdID09ICcvJyAmJiAodXJsID0gdXJsLnNsaWNlKDAsIC0xKSk7XG5cbiAgICAgIHJldHVybiB1cmw7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gcHJvY2Vzc1VybCh1cmwsIGVzYykge1xuICAgICAgdmFyIHBpZWNlcyA9IHVybC5zcGxpdCgnLycpLFxuICAgICAgICAgIHJ1bGVzID0gcm91dGVzLFxuICAgICAgICAgIHBhcmFtcyA9IHt9O1xuXG4gICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHBpZWNlcy5sZW5ndGggJiYgcnVsZXM7ICsraSkge1xuICAgICAgICB2YXIgcGllY2UgPSBlc2MocGllY2VzW2ldKTtcbiAgICAgICAgcnVsZXMgPSBydWxlc1twaWVjZS50b0xvd2VyQ2FzZSgpXSB8fCBydWxlc1snOiddO1xuICAgICAgICBydWxlcyAmJiBydWxlc1snfiddICYmIChwYXJhbXNbcnVsZXNbJ34nXV0gPSBwaWVjZSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBydWxlcyAmJiB7XG4gICAgICAgIGNiOiBydWxlc1snQCddLFxuICAgICAgICBwYXJhbXM6IHBhcmFtc1xuICAgICAgfTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBwcm9jZXNzUXVlcnkodXJsLCBjdHgsIGVzYykge1xuICAgICAgaWYgKHVybCAmJiBjdHguY2IpIHtcbiAgICAgICAgdmFyIGhhc2ggPSB1cmwuaW5kZXhPZignIycpLFxuICAgICAgICAgICAgcXVlcnkgPSAoaGFzaCA8IDAgPyB1cmwgOiB1cmwuc2xpY2UoMCwgaGFzaCkpLnNwbGl0KCcmJyk7XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IDA7IGkgPCBxdWVyeS5sZW5ndGg7ICsraSkge1xuICAgICAgICAgIHZhciBuYW1lVmFsdWUgPSBxdWVyeVtpXS5zcGxpdCgnPScpO1xuXG4gICAgICAgICAgY3R4LnBhcmFtc1tuYW1lVmFsdWVbMF1dID0gZXNjKG5hbWVWYWx1ZVsxXSk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGN0eDtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBsb29rdXAodXJsKSB7XG4gICAgICB2YXIgcXVlcnlTcGxpdCA9IHNhbml0aXplKHVybCkuc3BsaXQoJz8nKTtcbiAgICAgIHZhciBlc2MgPSB+dXJsLmluZGV4T2YoJyUnKSA/IGRlY29kZSA6IG5vb3A7XG5cbiAgICAgIHJldHVybiBwcm9jZXNzUXVlcnkocXVlcnlTcGxpdFsxXSwgcHJvY2Vzc1VybChxdWVyeVNwbGl0WzBdLCBlc2MpIHx8IHt9LCBlc2MpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGFkZChyb3V0ZSwgaGFuZGxlcikge1xuICAgICAgdmFyIHBpZWNlcyA9IHJvdXRlLnNwbGl0KCcvJyk7XG4gICAgICB2YXIgcnVsZXMgPSByb3V0ZXM7XG5cbiAgICAgIGZvciAodmFyIGkgPSArKHJvdXRlWzBdID09PSAnLycpOyBpIDwgcGllY2VzLmxlbmd0aDsgKytpKSB7XG4gICAgICAgIHZhciBwaWVjZSA9IHBpZWNlc1tpXTtcbiAgICAgICAgdmFyIG5hbWUgPSBwaWVjZVswXSA9PSAnOicgPyAnOicgOiBwaWVjZS50b0xvd2VyQ2FzZSgpO1xuXG4gICAgICAgIHJ1bGVzID0gcnVsZXNbbmFtZV0gfHwgKHJ1bGVzW25hbWVdID0ge30pO1xuXG4gICAgICAgIG5hbWUgPT0gJzonICYmIChydWxlc1snfiddID0gcGllY2Uuc2xpY2UoMSkpO1xuICAgICAgfVxuXG4gICAgICBydWxlc1snQCddID0gaGFuZGxlcjtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBydW4odXJsLCBhcmcpIHtcbiAgICAgIHZhciByZXN1bHQgPSBsb29rdXAodXJsKTtcblxuICAgICAgcmV0dXJuIChyZXN1bHQuY2IgfHwgbm90Rm91bmQpKHJlc3VsdC5wYXJhbXMsIGFyZywgdXJsKTtcbiAgICB9O1xuICB9O1xufSkpO1xuIiwiaW1wb3J0ICcuLi8uLi9ub2RlX21vZHVsZXMvbm9ybWFsaXplLmNzcy9ub3JtYWxpemUuY3NzJztcbmltcG9ydCAnLi4vY3NzL3N0eWxlcy5jc3MnO1xuaW1wb3J0IHJsaXRlIGZyb20gJ3JsaXRlLXJvdXRlcic7XG5cbmNvbnN0IHJvdXRlID0gcmxpdGUobm90Rm91bmQsIHtcbiAgLy8gRGVmYXVsdCByb3V0ZVxuICAnJzogZnVuY3Rpb24gKCkge1xuICAgIHJldHVybiAnSG9tZSc7XG4gIH0sXG5cbiAgLy8gI2luYm94XG4gICdpbmJveCc6IGZ1bmN0aW9uICgpIHtcbiAgICByZXR1cm4gJ0luYm94JztcbiAgfSxcblxuICAvLyAjc2VudD90bz1qb2huIC0+IHIucGFyYW1zLnRvIHdpbGwgZXF1YWwgJ2pvaG4nXG4gICdzZW50JzogZnVuY3Rpb24gKHsgdG8gfSkge1xuICAgIHJldHVybiAnU2VudCB0byAnICsgdG87XG4gIH0sXG5cbiAgLy8gI3VzZXJzL2NocmlzIC0+IHIucGFyYW1zLm5hbWUgd2lsbCBlcXVhbCAnY2hyaXMnXG4gICd1c2Vycy86bmFtZSc6IGZ1bmN0aW9uICh7IG5hbWUgfSkge1xuICAgIHJldHVybiAnVXNlciAnICsgbmFtZTtcbiAgfSxcblxuICAvLyAjbG9nb3V0XG4gICdsb2dvdXQnOiBmdW5jdGlvbiAoKSB7XG4gICAgcmV0dXJuICdMb2dvdXQnO1xuICB9LFxufSk7XG5cbmZ1bmN0aW9uIG5vdEZvdW5kICgpIHtcbiAgcmV0dXJuICc8aDE+NDA0IE5vdCBmb3VuZCA6LzwvaDE+Jztcbn1cbiJdLCJuYW1lcyI6WyJ0aGlzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQSxDQUFDLFVBQVUs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
