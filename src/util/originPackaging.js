 
function setupWebViewJavascriptBridge(callback) {
  if (window.WebViewJavascriptBridge) {
    return callback(WebViewJavascriptBridge);
  }
  if (window.WVJBCallbacks) {
    return window.WVJBCallbacks.push(callback);
  }
  window.WVJBCallbacks = [callback];
  var WVJBIframe = document.createElement("iframe");
  WVJBIframe.style.display = "none";
  WVJBIframe.src = "wvjbscheme://__BRIDGE_LOADED__";
  document.documentElement.appendChild(WVJBIframe);
  setTimeout(function() {
    document.documentElement.removeChild(WVJBIframe);
  }, 0);
}

setupWebViewJavascriptBridge(function(bridge) {
  bridge.registerHandler("testJSFunction", function(data, responseCallback) {
    alert("JS方法被调用:" + data);
    responseCallback("js执行过了");
  });
});

function isAppInside() {
  console.log(window.localStorage.getItem("isAppInside") == "1");
  if (window.localStorage.getItem("isAppInside") == "1") {
    // 表示不在APP 内部
    return true;
  } else {
    return false;
  }
}

//获取经纬度
const locationClick = function() {
  if (!isAppInside()) {
    return;
  }
  return new Promise((resolve, reject) => {
    WebViewJavascriptBridge.callHandler("locationClick", null, function(
      response
    ) {
      resolve(response);
    });
  });
};
//当前页面加载指定页面
const refreshUrl = function(url) {
  if (!isAppInside()) {
    return;
  }
  return new Promise((resolve, reject) => {
    WebViewJavascriptBridge.callHandler("refreshUrl", { url: url }, function(
      response
    ) {
      resolve(response);
    });
  });
};
//分享
const share = function(id, url) {
  if (!isAppInside()) {
    return;
  }
  return new Promise((resolve, reject) => {
    WebViewJavascriptBridge.callHandler(
      "shareClick",
      { Id: id, url: url },
      function(response) {
        resolve(response);
      }
    );
  });
};

//页面加载完传参
const m_init = function() {
  if (!isAppInside()) {
    return;
  }
  return new Promise((resolve, reject) => {
    WebViewJavascriptBridge.callHandler("m_init", null, function(response) {
      resolve(response);
    });
  });
};

//返回上一级页面
const closePage = function() {
  console.log(this);

  if (!isAppInside()) {
    return;
  }
  return new Promise((resolve, reject) => {
    WebViewJavascriptBridge.callHandler("closePage", null, function(response) {
      resolve(response);
    });
  });
};

// 返回分装
const choiceReturn = function(that,obj) {
  console.log(that);
  console.log(obj)
  // this.$router.push(obj)
  
  if (isAppInside()) {
    closePage();
  } else {
    console.log(this);
  }
};

//返回最初页面
const rootPage = function() {
  if (!isAppInside()) {
    return;
  }
  return new Promise((resolve, reject) => {
    WebViewJavascriptBridge.callHandler("rootPage", null, function(response) {
      resolve(response);
    });
  });
};

//跳转页面
const newPage = function(url, type) {
  if (!isAppInside()) {
    return;
  }
  return new Promise((resolve, reject) => {
    WebViewJavascriptBridge.callHandler(
      "newPage",
      { url: url, type: type },
      function(response) {
        resolve(response);
      }
    );
  });
};

// 退出登陆
const loginOut = function(url, type) {
  if (!isAppInside()) {
    return;
  }
  return new Promise((resolve, reject) => {
    WebViewJavascriptBridge.loginOut("loginOut", null, function(response) {});
  });
};

export default {
  refreshUrl,
  share,
  m_init,
  locationClick,
  closePage,
  choiceReturn, //返回上级页面  原生和web判断
  rootPage,
  newPage,
  loginOut
};
