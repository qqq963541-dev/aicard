
import React from 'react';

const Course: React.FC = () => {
  const lessons = [
    {
      title: "第一课：火山引擎即梦大模型简介",
      icon: "fa-cloud",
      color: "text-blue-400",
      bg: "bg-blue-500/10",
      desc: "即梦 (Jimeng) 是由火山引擎推出的高性能 AI 创作平台。它擅长处理复杂的中文指令，能够根据简单的描述生成极具电影感的视觉画面和游戏角色。",
      keyPoint: "Jimeng AI 专注于高精度的图像理解与生成。"
    },
    {
      title: "第二课：扩散模型在即梦中的演进",
      icon: "fa-atom",
      color: "text-purple-400",
      bg: "bg-purple-500/10",
      desc: "即梦模型基于先进的扩散生成技术，能够从海量美学数据中学习。它不仅关注画面的细节，更能捕捉光影、材质和透视，为每一张召唤卡牌赋予‘质感’。",
      keyPoint: "扩散模型 (Diffusion) 是即梦实现高精立绘的核心。"
    },
    {
      title: "第三课：针对即梦的提示词优化",
      icon: "fa-scroll",
      color: "text-green-400",
      bg: "bg-green-500/10",
      desc: "由于即梦对中文语境理解极深，你可以直接输入‘身披金甲的古代将军’。通过添加‘写实风格’或‘史诗电影构图’，可以进一步提升即梦生成结果的震撼力。",
      keyPoint: "中文语境下的 Prompt 是与即梦交流的最佳方式。"
    },
    {
      title: "第四课：AI赋能的未来游戏",
      icon: "fa-vr-cardboard",
      color: "text-orange-400",
      bg: "bg-orange-500/10",
      desc: "通过 API 调用即梦模型，开发者可以将原本昂贵的美术资源生产变为实时的玩家互动体验。这标志着‘内容消费型’游戏向‘内容生成型’游戏的跨越。",
      keyPoint: "即梦 API 让每一位玩家都成为游戏的创作者。"
    }
  ];

  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <div className="mb-12 text-center">
        <h2 className="text-4xl font-orbitron font-bold mb-4 bg-gradient-to-r from-blue-400 to-indigo-500 bg-clip-text text-transparent">
          即梦 AI 召唤学堂
        </h2>
        <p className="text-slate-400">解密火山引擎即梦背后的黑科技，带你进阶为 AI 召唤大师</p>
      </div>

      <div className="space-y-6">
        {lessons.map((lesson, idx) => (
          <div key={idx} className="group bg-slate-800/40 border border-slate-700 hover:border-blue-500/50 rounded-3xl p-8 transition-all hover:shadow-2xl">
            <div className="flex flex-col md:flex-row gap-6">
              <div className={`w-16 h-16 shrink-0 rounded-2xl ${lesson.bg} flex items-center justify-center`}>
                <i className={`fa-solid ${lesson.icon} text-3xl ${lesson.color}`}></i>
              </div>
              <div>
                <h3 className="text-xl font-bold mb-3 flex items-center gap-3">
                  {lesson.title}
                  <span className="text-[10px] bg-slate-700 px-2 py-0.5 rounded uppercase text-slate-400 font-mono italic">UNIT {idx + 1}</span>
                </h3>
                <p className="text-slate-400 leading-relaxed mb-4">{lesson.desc}</p>
                <div className="inline-block px-4 py-2 bg-slate-900/50 rounded-lg border border-slate-700/50">
                  <span className="text-xs font-bold text-slate-300">💡 即梦小贴士：</span>
                  <span className="text-xs text-blue-400 ml-1">{lesson.keyPoint}</span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-16 bg-gradient-to-br from-indigo-700 to-blue-900 p-10 rounded-[2.5rem] relative overflow-hidden text-center shadow-2xl">
        <div className="absolute top-0 right-0 p-4 opacity-10">
          <i className="fa-solid fa-cloud-bolt text-9xl"></i>
        </div>
        <h3 className="text-2xl font-bold mb-4 relative z-10">技术已就绪，灵感在发酵</h3>
        <p className="text-blue-100 mb-8 max-w-lg mx-auto relative z-10">
          你已了解即梦模型的运作逻辑。现在，请使用你最天马行空的关键词，让即梦为你呈现奇迹。
        </p>
        <button 
          onClick={() => window.location.hash = 'GACHA'} 
          className="bg-white text-indigo-700 px-10 py-4 rounded-2xl font-black text-lg hover:scale-105 transition-transform shadow-[0_10px_40px_rgba(255,255,255,0.3)]"
        >
          立即前往即梦祭坛
        </button>
      </div>
    </div>
  );
};

export default Course;
