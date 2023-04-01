export default [
  // {
  //   project: '生鲜项目',
  //   project_describe: '项目描述',
  //   // '项目职责'
  //   project_responsibility: [],
  //   // '技术栈'
  //   project_describe2: [],
  //   // '项目使用的技术'
  //   project_responsibility2: []
  // },
  // 个人博客
  // {
  //   project: '个人博客(vue3)',
  //   project_describe:
  //     '一个博客网址,内部包含了网易音乐播放，个人学习笔记，个人简历',
  //   project_responsibility: ['整个项目都由自己独立完成'],
  //   project_technical:
  //     'Vue3+Vite+Node+pinia+vue-router+v-md-editor+animate.css+axios',
  //   project_usetechnical: [
  //     '使用vite快速构建Vue3项目配置router、pinia等基础插件功能,配置eslint和prettier统一代码风格和scss预编译',
  //     '对axios二次封装,配置请求拦截和响应拦截,设置token请求头,统一请求参数',
  //     '完成登录注册模块,以及基本的登录验证',
  //     '使用pinia管理登录状态,实现用户权限限制',
  //     '使用v-md-editor组件来实现网页浏览markdown文档',
  //     '使用animate.css来实现了一些简单的动画效果和页面切换动画',
  //     '使用node+mongdb编写登录、注册、等数据接口,以及代理网易云音乐数据接口',
  //     '运用css3实现了一个3d登录注册样式,以及使用原生鼠标事件让其可以拖拽旋转',
  //     '运用audio原生api实现了一个自定义播放控制台'
  //   ]
  // },
  // 生鲜项目
  {
    project: '生百超市(移动端)',
    project_describe:
      '生鲜产品品类齐全，各种各样的餐饮用品、生鲜蔬菜都能线上选购；优质产品新鲜直供，减少中间交易环节，降低用户的生活采购成本清晰的产品分类，减少选购人力投入，快速查找到想要购买的产品的一款优质优惠的在线生鲜采购配送平台',
    project_responsibility: [
      '负责对ui图的还原以及首页、分类、购物车、订单、登录、注册等模块功能实现'
    ],
    project_technical: 'Vue2+Vuex+swiper+vue-router+axios',
    project_usetechnical: [
      '使用Vue脚手架快速构建项目配置router、vuex等基础插件功能,配置eslint和prettier统一代码风格、less预编译样式、postcss-pxtorem和lib-flexible移动端适配',
      '使用swiper插件完成首页轮播图功能',
      '对axios二次封装,配置请求拦截和响应拦截,设置token请求头,统一请求参数,以及对请求api统一管理',
      '路由跳转使用声明式和编程式并使用params和query来传参',
      '定义公共的头部组件和tabBar组件',
      '完成首页、分类、购物车、订单、登录、注册等模块',
      '使用路由拦截根据token判断来对用户进行页面访问权限管理',
      '分类列表中的搜索功能,添加了工具函数节流',
      '购物车模块,首先请求购物车api获取购物车列表并渲染。使用vue双向绑定v-model表单多选框来创建一个新的操作数组,利用watch监听这个操作数组来实现全选、反选、单选,再利用这个操作数组去发起我们的删除提交请求,如果是删除还需要在请求成功后利用forEach()、filter()、every()等数组方法去删除渲染数组中包含操作数组的元素',
      '自定义全局Toast、confirm组件利用vuex模块化分别管理Toast、confirm的状态和提示信息以及回调函数',
      '通过tabBar组件上绑定的key属性并使用vuex给它赋值,当我们对购物车数量同时去修改vuex中管理购物key属性的值来重新渲染tabBar组件从而改变购物车计数'
    ]
  },
  // 果业通
  {
    project: '果业通项目(uni-app)',
    project_describe:
      '果业通立足于“北方落叶果树”,以“最真实、最科学、最接地气”为核心推广理念,其内容涵盖了果树种植技术交流、农业资讯以及专家面向果农一对一、一对多技术难点解答等多种信息交流板块,并依托优质技术资源,以整合各类农资产品,筛选各地区优质生产厂家为基础设立供求专区，为各大企业、经销商开展线上产品推广营销服务,全方位解决果农在农业生产过程中信息不畅、缺乏科学指导等问题,为数以万计的种植业户提供更加广阔的网络推广平台。',
    project_responsibility: [
      '负责对项目样式、功能优化、以及组件重构'
    ],
    project_technical: 'uni-app+Node+mescroll-uni+uni-ui+vuex',
    project_usetechnical: [
      '在pages.json中配置底部tabBar,和每个页面的基本设置',
      '使用uni-app原生Api,uni.request()请求后端数据,设置token请求头,以及对请求api统一管理',
      '完成发布、登录、注册、修改头像和名称等功能模块',
      '使用vuex管理登录状态和用户基本信息',
      '使用uni.addInterceptor()进行路由拦截根据token判断来对用户进行页面访问权限管理',
      '使用mescroll-uni插件实现下拉刷新和下拉加载',
      '分类列表中的搜索功能,添加了工具函数节流',
      '使用小程序原生组件swiper套实现tags内容滑动切换, 并使用uni.createSelectorQuery()获取节点信息，让swiper组件的高度自适应'
      // '使用node+express+mongdb编写对应的发布、登录、注册、修改头像和名称的请求接口以及设置了token请求权限'
    ]
  }
  // 网易云音乐
  // {
  //   project: '网易云音乐项目(vue2)',
  //   project_describe:
  //     '一个仿网易云PC官网,练手项目，也是第一个vue项目',
  //   project_responsibility: ['整个项目都由自己独立完成'],
  //   project_technical:
  //     'vue2+vuex+vue-router+vue-video-player+vue-aplayer+swiper+ElementUI',
  //   project_usetechnical: [
  //     '使用脚手架构建项目配置router、vuex等基础插件功能,以及less预编译',
  //     '对axios二次封装,统一请求参数,以及配置代理服务器',
  //     '完成了排行榜，歌单，歌手，新碟上架，歌曲详情，歌手详情的数据渲染',
  //     '完成了音乐和MV的搜索功能加搜索提示,并在搜索输入时添加了节流',
  //     '使用swiper完成了首页和MV的轮播图',
  //     '使用路由传参的方式让歌曲详情和歌手详情页展示与歌曲相应的信息',
  //     '对vue-aplayer二次封装,并使用vuex管理播放音乐的基本信息,实现了不同页面播放音乐',
  //     '使用vue-video-player实现MV播放',
  //     '封装了时间、歌词处理的工具函数',
  //     '使用ElementUI组件库中的el-pagination组件实现了评论歌单的分页',
  //     '项目功能组件化程度高,基本页面组件化不高'
  //   ]
  // },
  // React
  // {
  //   project: '别墅项目(react)',
  //   project_describe: '一个旅游住宿的app,react初体验',
  //   project_responsibility: ['整个项目都由自己独立完成'],
  //   project_technical: 'react+react-router+mobx+axios+antd-mobile',
  //   project_usetechnical: [
  //     '使用脚手架构建项目配置react-router、mobx,以及sass预编译',
  //     '完成了首页、发现、我的、登录等模块',
  //     '对axios二次封装,统一请求参数',
  //     '项目基本都是使用hook语法来编写组件,使用useEffect()来请求服务器返回数据',
  //     '创建router文件统一管理路由组件',
  //     '使用mobx管理登录状态',
  //     '使用useNavigate()来进行跳转和传参',
  //     '使用useState()来进行响应式数据',
  //     '使用useLocation()来进行路由拦截和控制我们的底部tabBar是否显示',
  //     '使用map()数组方法对列表数据的渲染,使用三元表达式进行条件渲染',
  //     '引用antd-mobile组件库,完成一些提示和基本组件'
  //   ]
  // },
  // 后台管理
  // {
  //   project: '后台管理系统(PC)',
  //   project_describe: '用于管理',
  //   project_responsibility: ['负责'],
  //   project_technical: 'react+react-router+mobx+axios+antd-mobile',
  //   project_usetechnical: []
  // }
];
