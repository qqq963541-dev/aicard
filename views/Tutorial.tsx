
import React from 'react';

interface TutorialProps {
  onNext: () => void;
}

const Tutorial: React.FC<TutorialProps> = ({ onNext }) => {
  return (
    <div className="max-w-4xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-orbitron font-bold mb-4 border-l-4 border-green-500 pl-4">技术小科普</h2>
      <p className="text-slate-400 mb-10">在开始游戏前，让我们了解一下这款游戏背后的“黑科技”。</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-green-500/20 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-robot text-green-400"></i>
            </div>
            <h3 className="font-bold">什么是 AIGC?</h3>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            AIGC (AI Generated Content) 是指利用人工智能技术来生成内容。在本游戏中，当你点击“召唤”时，系统会向 Google Gemini 模型发送指令，它会在几秒钟内为你构思出全新的卡牌。
          </p>
        </div>

        <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-blue-500/20 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-image text-blue-400"></i>
            </div>
            <h3 className="font-bold">Diffusion 扩散模型</h3>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            卡牌的精美立绘是由“扩散模型”生成的。它通过从纯噪声中一步步“去噪”，最终还原出符合描述的高质量图像。这正是 Gemini 2.5 Flash Image 擅长的工作。
          </p>
        </div>

        <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-purple-500/20 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-code text-purple-400"></i>
            </div>
            <h3 className="font-bold">Prompt Engineering</h3>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            “提示词工程”是与 AI 交流的艺术。你给出的描述越具体（如：赛博朋克风格、冷酷的、手持蓝光剑），AI 生成的卡牌就越符合你的期待。
          </p>
        </div>

        <div className="bg-slate-800/40 p-6 rounded-2xl border border-slate-700">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-10 h-10 bg-orange-500/20 rounded-lg flex items-center justify-center">
              <i className="fa-solid fa-bolt text-orange-400"></i>
            </div>
            <h3 className="font-bold">Real-time LLM</h3>
          </div>
          <p className="text-sm text-slate-400 leading-relaxed">
            战斗过程中的精彩旁白是由大语言模型实时生成的。它能理解战斗的上下文，并给出富有沉浸感的文字描述。
          </p>
        </div>
      </div>

      <div className="bg-green-900/10 border border-green-500/30 p-6 rounded-2xl mb-12">
        <h4 className="font-bold text-green-400 mb-2 flex items-center gap-2">
          <i className="fa-solid fa-lightbulb"></i>
          召唤师贴士
        </h4>
        <p className="text-sm text-slate-300">
          尝试不同的关键词组合，比如 "Ancient Greek God" + "Mech Armor"，看看 AI 会碰撞出怎样的火花！
        </p>
      </div>

      <div className="flex justify-between items-center">
        <span className="text-xs text-slate-500">已阅读: 100% | 课程课时: 1.5h</span>
        <button 
          onClick={onNext}
          className="px-10 py-4 bg-green-600 hover:bg-green-500 rounded-xl font-bold shadow-lg shadow-green-500/20"
        >
          我学会了，开启召唤
        </button>
      </div>
    </div>
  );
};

export default Tutorial;
