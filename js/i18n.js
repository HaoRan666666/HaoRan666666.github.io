// 中英文文案配置：key 对应 HTML 中的 data-i18n 属性
const translations = {
  zh: {
    brand: "徐浩然",
    nav: { about: "关于", skills: "技术栈", projects: "项目", contact: "联系" },
    hero: {
      greeting: "你好，我是",
      name: "徐浩然",
      role: "机器人运控工程师",
      bio: "RL新手，目前正在学习足式机器人 locomotion。",
      viewProjects: "查看项目",
      contactMe: "联系我",
    },
    about: {
      title: "关于我",
      subtitle: "简单介绍一下自己",
      p1: "我是一名来自南昌航空大学的大二在读本科生（马上就要大三了QAQ）。",
      p2: "哈哈哈哈哈哈哈有时间再写",
      location: "所在地",
      locationValue: "中国·上海",
      email: "邮箱",
      status: "状态",
      statusValue: "学生（实习中）",
    },
    skills: {
      title: "技术栈",
      subtitle: "我常用的技术与工具",
      embedded: "嵌入式",
      simulation: "仿真",
      mechanical: "结构",
      tools: "工具",
      programming: "编程",
      threeDPrint: "3D打印",
    },
    projects: {
      title: "项目经历",
      subtitle: "我做过的项目",
      item1: {
        title: "基于 VMC 的四足机器人运动控制",
        meta: "项目负责人 · 2026.04 - 至今",
        desc: "负责 12DOF 四足机器人运动控制算法开发，基于 VMC 构建足端虚拟弹簧-阻尼控制模型，结合复合摆线轨迹规划与逆运动学生成关节目标位置，采用 CAN 通信完成 12 关节协同控制，实现基础行走验证；项目获多家企业合作支持，累计赞助 10w+。",
      },
      item2: {
        title: "RoboMaster 平衡步兵机器人",
        meta: "项目负责人 · 2025.09 - 2026.03",
        desc: "负责轮腿式平衡机器人底盘及二维云台控制，基于状态空间与 Jacobian 线性化建模，采用 LQR 与 VMC 设计控制器并用 MATLAB/Simulink、Simscape 仿真验证；实现实机调试，支持腿长控制、离地检测、打滑检测、翻倒自起等功能，云台采用前馈+双环 PID 实现稳定跟踪。",
      },
      item3: {
        title: "基于 S 曲线轨迹规划的起重机智能控制系统",
        meta: "核心成员 · 2025.07 - 2025.08",
        desc: "负责多自由度机器人系统的运动控制与轨迹规划，基于 STM32 完成底盘、旋转、升降与机械爪协同控制，设计七段式 S 曲线轨迹规划算法使启停冲击降低 70%+，构建位置-速度双闭环 PID 与速度前馈，融合编码器与激光测距实现毫米级定位。",
      },
      item4: {
        title: "Mini 人形机器人舞蹈动作训练及部署",
        meta: "2026.08 - 至今",
        desc: "哈哈哈哈哈哈有空再写吧",
      },
    },
    contact: { title: "联系我", subtitle: "欢迎与我交流", email: "邮箱", github: "GitHub" },
    footer: { copyright: "© 2026 徐浩然. 保留所有权利。" },
  },

  en: {
    brand: "Haoran Xu",
    nav: { about: "About", skills: "Skills", projects: "Projects", contact: "Contact" },
    hero: {
      greeting: "Hi, I'm",
      name: "Haoran Xu",
      role: "Robot Motion Control Engineer",
      bio: "New to RL, currently learning legged robot locomotion.",
      viewProjects: "View Projects",
      contactMe: "Contact Me",
    },
    about: {
      title: "About Me",
      subtitle: "A brief introduction",
      p1: "I am a sophomore undergraduate student at Nanchang Hangkong University (about to be a junior, QAQ).",
      p2: "Hahaha, will write more later.",
      location: "Location",
      locationValue: "Shanghai, China",
      email: "Email",
      status: "Status",
      statusValue: "Student (interning)",
    },
    skills: {
      title: "Tech Stack",
      subtitle: "Technologies & tools I use",
      embedded: "Embedded",
      simulation: "Simulation",
      mechanical: "Mechanical Design",
      tools: "Tools",
      programming: "Programming",
      threeDPrint: "3D Printing",
    },
    projects: {
      title: "Projects",
      subtitle: "Things I've built",
      item1: {
        title: "VMC-Based Quadruped Robot Motion Control",
        meta: "Project Lead · 2026.04 - Present",
        desc: "Developed motion control algorithms for a 12-DOF quadruped robot, building a virtual spring-damper foot-end model based on VMC, combining cycloid trajectory planning with inverse kinematics, and coordinating 12 joints over CAN to achieve basic walking. Secured 100k+ in corporate sponsorship.",
      },
      item2: {
        title: "RoboMaster Balancing Infantry Robot",
        meta: "Project Lead · 2025.09 - 2026.03",
        desc: "Designed chassis and 2-axis gimbal control for a wheel-legged balancing robot, modeling the system via state-space and Jacobian linearization, implementing LQR/VMC controllers validated with MATLAB/Simulink and Simscape, plus feedforward + dual-loop PID gimbal tracking with leg-length control, lift-off/slip detection and self-righting.",
      },
      item3: {
        title: "S-Curve Trajectory Planning for Crane Control System",
        meta: "Core Member · 2025.07 - 2025.08",
        desc: "Developed motion control and trajectory planning for a multi-DOF robot system, implementing coordinated chassis/rotation/lift/gripper control on STM32, a 7-segment S-curve planner cutting start/stop shock by 70%+, and dual-loop PID with velocity feedforward, fusing encoder and laser-ranging data for millimeter-level positioning.",
      },
      item4: {
        title: "Mini Humanoid Robot Dance Motion Training & Deployment",
        meta: "2026.08 - Present",
        desc: "Hahaha, will write this up later.",
      },
    },
    contact: { title: "Contact Me", subtitle: "Let's connect", email: "Email", github: "GitHub" },
    footer: { copyright: "© 2026 Haoran Xu. All rights reserved." },
  },
};

function getTranslation(lang, key) {
  return key.split(".").reduce((obj, k) => (obj == null ? obj : obj[k]), translations[lang]);
}

function applyLanguage(lang) {
  document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const text = getTranslation(lang, el.getAttribute("data-i18n"));
    if (text != null) el.textContent = text;
  });

  const langBtn = document.getElementById("lang-toggle");
  if (langBtn) langBtn.textContent = lang === "zh" ? "EN" : "中";
}
