<script setup lang="ts">

import CardComponent from '../components/CardComponent.vue';
import { type CSSProperties } from 'vue';
import { ref } from 'vue';

import { useRouter } from 'vue-router'

const router = useRouter()

const goToLogin = () => {
  router.push('/login')

}

const faqs = ref([
  {
    question: '这款工具能生成什么类型的图像?',
    answer: '这款工具能生成各种类型的图像，包括肖像、风景、物体等。',
    open: false,
  },
  {
    question: '工具的三种使用模式是什么意思?',
    answer: '我们提供了"快捷场景"、"中级"和"高级"三种模式。"快捷场景"只需一句话即可生成特定类型图像;"中级"模式支持中文输入并翻译成英文;"高级"模式则呈现原生Stable Diffusion界面,适合资深用户。',
    open: false,
  },
  {
    question: '使用这款工具需要什么硬件配置?',
    answer: '使用这款工具需要一台具有较强计算能力的电脑，最好配备高性能的显卡。',
    open: false,
  },
  {
    question: '生成图像的分辨率如何?',
    answer: '生成图像的分辨率取决于输入设置，最高可以达到4K分辨率。',
    open: false,
  },
  {
    question: '能否生成人物肖像或照片?',
    answer: '可以生成人物肖像或照片，但生成的效果取决于输入的具体描述。',
    open: false,
  },
  {
    question: '使用这款工具需要付费吗?',
    answer: '根据不同的使用需求，有免费和付费两种版本供选择。',
    open: false,
  },
  {
    question: '图像生成的速度有多快?',
    answer: '图像生成的速度取决于输入的复杂度和硬件配置，一般在几秒钟到几分钟不等。',
    open: false,
  },
]);

const toggleFaq = (index: number) => {
  faqs.value[index].open = !faqs.value[index].open;
};

const QAStyle:CSSProperties = {
  width: '100%',
  paddingLeft: '184px',
  paddingRight: '184px',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '30px',
  display: 'flex',
};

const faqStyle:CSSProperties = {
  width: '133px',
  height: '24px',
  textAlign: 'center',
  color: '#377DFF',
  fontSize: '20px',
  fontFamily: 'Nunito',
  fontWeight: '700',
  lineHeight: '24px',
  letterSpacing: '0.20px',
  wordWrap: 'break-word',
};

const questionTitleStyle:CSSProperties = {
  width: '769px',
  height: '74px',
  textAlign: 'center',
  color: '#1D1D1D',
  fontSize: '58px',
  fontFamily: 'Nunito',
  fontWeight: '700',
  letterSpacing: '0.17px',
  wordWrap: 'break-word',
};

const frame2176Style:CSSProperties = {
  padding: '30px',
  background: 'white',
  boxShadow: '4px 4px 30px rgba(0, 0, 0, 0.10)',
  borderRadius: '16px',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  alignItems: 'flex-start',
  gap: '20px',
  display: 'flex',
};

const faqItemStyle = {
  width: '100%',
};

const faqQuestionStyle = {
  width: '100%',
  justifyContent: 'space-between',
  alignItems: 'center',
  display: 'inline-flex',
};

const  questionStyle:CSSProperties = {
  color: '#1D1D1D',
  fontSize: '16px',
  fontFamily: 'Nunito',
  fontWeight: '700',
  lineHeight: '24px',
  letterSpacing: '0.16px',
  wordWrap: 'break-word',
};

const buttonStyle = {
  width: '24px',
  height: '24px',
  justifyContent: 'center',
  alignItems: 'center',
  display: 'flex',
  border: 'none',
  background: 'none',
  cursor: 'pointer',
};

const arrowStyle = (isOpen: any) => ({
  width: '17.34px',
  height: '8.60px',
  background: '#292D32',
  transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
});

const faqAnswerStyle:CSSProperties = {
  width: '100%',
  color: '#000',
  fontSize: '16px',
  fontFamily: 'Quicksand',
  fontWeight: '400',
  lineHeight: '24px',
  letterSpacing: '0.16px',
  wordWrap: 'break-word',
  padding: '10px 0',
};

const lineStyle = {
  width: '100%',
  height: '1px',
  background: '#D9D9D9',
};

const contactUsStyle = {
  height: '391px',
  paddingLeft: '182px',
  paddingRight: '182px',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '86px',
  display: 'inline-flex',
};

const frame2184Style:CSSProperties = {
  height: '400px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'flex-start',
  gap: '30px',
  display: 'inline-flex',
};

const textStyle:CSSProperties = {
  width: '620px',
  height: '152px',
  color: '#1D1D1D',
  fontSize: '58px',
  fontFamily: 'Nunito',
  fontWeight: '700',
  letterSpacing: '0.17px',
  wordWrap: 'break-word',
};

const contactDetailsStyle:CSSProperties = {
  width: '637px',
  height: '60px',
  color: '#464646',
  fontSize: '16px',
  fontFamily: 'Nunito',
  fontWeight: '400',
  lineHeight: '28px',
  letterSpacing: '0.16px',
  wordWrap: 'break-word',
};

const buttonContainerStyle:CSSProperties = {
  paddingLeft: '50px',
  paddingRight: '50px',
  paddingTop: '12px',
  paddingBottom: '12px',
  background: '#377DFF',
  boxShadow: '0px 4px 8px rgba(55, 125, 255, 0.50)',
  borderRadius: '24px',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '10px',
  display: 'flex',
};

const buttonTextStyle:CSSProperties = {
  color: 'white',
  fontSize: '16px',
  fontFamily: 'Nunito',
  fontWeight: '700',
  lineHeight: '24px',
  letterSpacing: '0.16px',
  wordWrap: 'break-word',
};

const group2176Style:CSSProperties = {
  width: '538px',
  height: '388px',
  position: 'relative',
};

const rectangle840Style:CSSProperties = {
  width: '294px',
  height: '288px',
  left: '244px',
  top: '0px',
  position: 'absolute',
  background: 'linear-gradient(0deg, #D9D9D9 0%, #D9D9D9 100%)',
  borderRadius: '16px',
};

const rectangle839Style:CSSProperties = {
  width: '325px',
  height: '288px',
  left: '0px',
  top: '100px',
  position: 'absolute',
  background: 'linear-gradient(0deg, #D9D9D9 0%, #D9D9D9 100%)',
  borderRadius: '16px',
};

const componentBottomStyle:CSSProperties = {
  width: '1728px',
  height: '400px',
  position: 'relative',
  background: '#383638',
};

const termsPoliciesStyle:CSSProperties = {
  left: '1051px',
  top: '81px',
  position: 'absolute',
};

const termsTitleStyle:CSSProperties = {
  color: 'white',
  fontSize: '22px',
  fontFamily: 'Nunito',
  fontWeight: '700',
  wordWrap: 'break-word',
};

const termsSpacerStyle:CSSProperties = {
  color: 'white',
  fontSize: '18.73px',
  fontFamily: 'Nunito',
  fontWeight: '300',
  wordWrap: 'break-word',
};

const termsTextStyle:CSSProperties = {
  color: 'white',
  fontSize: '18px',
  fontFamily: 'Nunito',
  fontWeight: '300',
  wordWrap: 'break-word',
};

const contactSupportStyle:CSSProperties = {
  left: '1321px',
  top: '81px',
  position: 'absolute',
};

const contactTitleStyle:CSSProperties = {
  color: 'white',
  fontSize: '22px',
  fontFamily: 'Nunito',
  fontWeight: '700',
  wordWrap: 'break-word',
};

const contactSpacerStyle:CSSProperties = {
  color: 'white',
  fontSize: '18.73px',
  fontFamily: 'Nunito',
  fontWeight: '300',
  wordWrap: 'break-word',
};

const contactTextStyle:CSSProperties = {
  color: 'white',
  fontSize: '18.73px',
  fontFamily: 'Nunito',
  fontWeight: '400',
  wordWrap: 'break-word',
};

const line4Style:CSSProperties = {
  width: '500px',
  height: '0px',
  left: '614px',
  top: '327px',
  position: 'absolute',
  border: '1px white solid',
};

const copyrightStyle:CSSProperties = {
  left: '692px',
  top: '337px',
  position: 'absolute',
  color: 'white',
  fontSize: '18px',
  fontFamily: 'Nunito',
  fontWeight: '400',
  wordWrap: 'break-word',
};

const frame2148Style:CSSProperties = {
  left: '764px',
  top: '272px',
  position: 'absolute',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '40px',
  display: 'inline-flex',
};

const group2143Style:CSSProperties = {
  width: '40px',
  height: '40px',
  position: 'relative',
};

const ellipse82Style:CSSProperties = {
  width: '40px',
  height: '40px',
  left: '0px',
  top: '0px',
  position: 'absolute',
  background: 'white',
  borderRadius: '9999px',
};

const facebookStyle:CSSProperties = {
  width: '24px',
  height: '24px',
  left: '7px',
  top: '8px',
  position: 'absolute',
};

const facebookVectorStyle:CSSProperties = {
  width: '11px',
  height: '20px',
  left: '7px',
  top: '2px',
  position: 'absolute',
  border: '2px #383638 solid',
};

const group2144Style:CSSProperties = {
  width: '40px',
  height: '40.01px',
  position: 'relative',
};

const ellipse83Style:CSSProperties = {
  width: '40px',
  height: '40.01px',
  left: '0px',
  top: '0px',
  position: 'absolute',
  background: 'white',
  borderRadius: '9999px',
};

const instagramStyle:CSSProperties = {
  width: '24px',
  height: '24px',
  left: '8px',
  top: '7.03px',
  position: 'absolute',
};

const instagramVectorStyle:CSSProperties = {
  width: '20px',
  height: '20px',
  left: '2px',
  top: '2px',
  position: 'absolute',
  border: '2px #383638 solid',
};

const instagramInnerVectorStyle:CSSProperties = {
  width: '8px',
  height: '8px',
  left: '8.04px',
  top: '7.96px',
  position: 'absolute',
  border: '2px #383638 solid',
};

const instagramDotStyle:CSSProperties = {
  width: '0.01px',
  height: '0px',
  left: '17.50px',
  top: '6.50px',
  position: 'absolute',
  border: '2px #383638 solid',
};

const group2147Style:CSSProperties = {
  width: '40px',
  height: '40.01px',
  position: 'relative',
};

const ellipse86Style:CSSProperties = {
  width: '40px',
  height: '40.01px',
  left: '0px',
  top: '0px',
  position: 'absolute',
  background: 'white',
  borderRadius: '9999px',
};

const twitterStyle:CSSProperties = {
  width: '24px',
  height: '24px',
  left: '8px',
  top: '7.03px',
  position: 'absolute',
};

const twitterVectorStyle:CSSProperties = {
  width: '22px',
  height: '17.94px',
  left: '1px',
  top: '2.99px',
  position: 'absolute',
  border: '2px #383638 solid',
};

const frame1000003494Style:CSSProperties = {
  left: '274px',
  top: '81px',
  position: 'absolute',
  justifyContent: 'flex-start',
  alignItems: 'center',
  gap: '10px',
  display: 'inline-flex',
};

const abstract05Style = {
  width: '40px',
  height: '40px',
  boxShadow: '0px 0px 12px rgba(255, 255, 255, 0.30)',
  borderRadius: '4px',
};

const aiImagesGeneratorStyle:CSSProperties = {
  width: '263px',
  height: '34px',
  color: 'white',
  fontSize: '28px',
  fontFamily: 'Nunito',
  fontWeight: '400',
  lineHeight: '30px',
  wordWrap: 'break-word',
};
</script>

<template>
  <header>
    <!-- <meta name="viewport" content="width=device-width, initial-scale=1.0"> -->

  </header>
  <div class="LandingpageIndex">
  <div class="Frame3644">
    <div class="ComponentLogo">
    <img class="Abstract05" style="width: 60px; height: 60px; border-radius: 8px" src="../assets/abstract-05.png" />
    <div class="Frame2186">
      <div class="AigAiImagesGenerator">
        <span class="LogoText1">AIG</span><br/>
        <span class="LogoText2">AI Images Generator</span>
      </div>
    </div>
    </div>
    <div class="MenuBar">
    <div class="MenuText1">首页</div>
    <div class="MenuText2">教程</div>
    <div class="MenuText3">论坛</div>
    </div>
   <div class="Frame3646">
    <div class="Frame31">
      <div class="LoadApp">加载应用</div>
    </div>
    <div class="CommonUser" @click="goToLogin" >
      <img class="profile" src="../assets/user.png" >
      <!-- <router-view></router-view> -->
    </div>
  </div>
  </div>
  <div class="Slogan">
    <div class="Ai">
        基于 AI 图像大模型的图片生成应用<br/>
        简单易用，快速准确
      </div>
      <div class="StableDiffusionFineTuning">
        我们基于 Stable Diffusion 为底层模型，根据实际需求 Fine-Tuning 后，实现了场景化图片准备生图能力。<br/>
        不仅如此，我们为应用独立设计了交互流程，让生图更简单。
      </div>
      <div class="Frame32">
        开始使用
      </div>
  </div>
  <div class="screen">
    <img class="image7" src="../assets/image7.png" alt="Sample Image"/>
    <div class="designedfor" style="left: 248px; top: 320px;">
      <div class="common-star">
        <img src="../assets/star.png">
        <div class="vector"></div>
      </div>
      <div class="text-small">专属优化</div>
      <div class="text-large">面对场景做过优化，准确生成你想要的图片</div>
    </div>
    <div class="designedfor" style="left: 797px; top: 49px;">
      <div class="common-heart">
        <img src="../assets/heart.png">
        <div class="vector-hidden"></div>
      </div>
      <div class="text-small">新手友好</div>
      <div class="text-large">即便是 0 基础的新手也可以运用自如</div>
    </div>
  </div>
  <div class="Feature">
    <div class="Frame2177">
      <div class="title">功能</div>
      <div class="StableDiffusion3">Stable Diffusion 3</div>
      <div class="StableDiffusion3Ai">
        这款基于 Stable Diffusion 3 的 AI 生成图像工具, 提供多种模式选择, 借助强大模型通过简单操作即可将你的创意灵感化作逼真精美的视觉作品, 并将持续优化以带来越来越出色的创作体验。
      </div>
    </div>
    <div class="Frame2175">
      <div class="Frame36">
        <CardComponent
          imageSrc = "../assets/Cone_01.png"
          title_inner = "模型底座"
          subtitle = "Stable Diffusion 3"
          gradientColors = "linear-gradient(133deg, #C47CFF 0%, #E6C7FF 100%)"
        />
        <CardComponent
          imageSrc="../assets/Cone_02.png"
          title_inner="标准场景"
          subtitle="生成简单场景图片"
          gradientColors = "linear-gradient(133deg, #7AC1FF 0%, #C6E4FE 100%)"
        />
      </div>
      <div class="Frame35">
        <CardComponent
          imageSrc="../assets/Cone_03.png"
          title_inner = "中文生图"
          subtitle = "用中文提示词输入"
          gradientColors = "linear-gradient(133deg, #7CE761 0%, #E6FBB8 100%)"
        />
        <CardComponent
          imageSrc="../assets/Cone_04.png"
          title_inner = "高级生图"
          subtitle = "SD 原生 WebUI"
          gradientColors = "linear-gradient(133deg, #F8BD38 0%, #F8F5B2 100%)"
        />
      </div>
    </div>
  </div>
  <div class="Mission">
    <div class="title">愿景</div>
    <div class="subtitle">让你创意变为现实</div>
    <div class="mission_content">
      <img class="Rectangle844" src="../assets/Rectangle844.png"/>
      <div class="AiAi">
        创意是人类最宝贵的能力之一,却往往难以完美呈现。无论是缺乏专业绘画技巧,还是时间精力有限,太多因素会阻碍我们将脑海中的画面转化为实实在在的视觉作品。而AI的发展为解决这一难题提供了新契机。
        <br/>
        这就是我们开发这款工具的初衷 - 通过AI的力量,消除创作门槛,为每一个人开辟一条畅通无阻的创意实现之路。无论你是资深艺术家还是生活爱好者,均可在本工具中尽情发挥创意,化无为有。
      </div>
    </div>
  </div>
  <div class="QA" :style="QAStyle">
    <div class="Faq" :style="faqStyle">FAQ</div>
    <div :style="questionTitleStyle">常见问题</div>
    <div class="Frame2176" :style="frame2176Style">
      <div v-for="(faq, index) in faqs" :key="index" class="faq-item" :style="faqItemStyle">
        <div class="faq-question" :style="faqQuestionStyle">
          <div :style="questionStyle">{{ faq.question }}</div>
          <button class="faq-toggle" @click="toggleFaq(index)" :style="buttonStyle">
            <div class="arrow" :style="arrowStyle(faq.open)">
             <img src="../assets/arrow-down.png">
            </div>
          </button>
        </div>
        <div v-if="faq.open" class="faq-answer" :style="faqAnswerStyle">{{ faq.answer }}</div>
        <div :style="lineStyle"></div>
      </div>
    </div>
  </div>
  <div class="Contactus" :style="contactUsStyle">
    <div class="Frame2184" :style="frame2184Style">
      <div :style="textStyle">
        希望与我们合作？<br />
        欢迎联系
      </div>
      <div class="XxxXxxCom400000000" :style="contactDetailsStyle">
        可以通过邮件 xxx@xxx.com 联系我们，或者直接拨打我们的热线电话：400-000-000，我们热切的希望获得你的反馈。
      </div>
      <div class="Frame4" :style="buttonContainerStyle">
        <div class="ApplyToCollaborate" :style="buttonTextStyle">Apply to Collaborate</div>
      </div>
    </div>
    <div class="Group2176" :style="group2176Style">
      <img class="Rectangle840" :style="rectangle840Style" src="../assets/Rectangle_840.png" />
      <img class="Rectangle839" :style="rectangle839Style" src="../assets/Rectangle_839.png" />
    </div>
  </div>
  <div class="ComponentBottom" :style="componentBottomStyle">
    <div class="TermsPoliciesTermsOfServicePrivacyPolicy" :style="termsPoliciesStyle">
      <span :style="termsTitleStyle">Terms & policies<br/></span>
      <span :style="termsSpacerStyle"><br/></span>
      <span :style="termsTextStyle">Terms of Service<br/><br/>Privacy Policy</span>
    </div>
    <div class="ContactSupportLayAi" :style="contactSupportStyle">
      <span :style="contactTitleStyle">Contact<br/></span>
      <span :style="contactSpacerStyle"><br/></span>
      <span :style="contactTextStyle">Support@lay.ai</span>
    </div>
    <div class="Line4" :style="line4Style"></div>
    <div class="Copyright2024LayAiAllRightReserved" :style="copyrightStyle">
      Copyright @ 2024 lay.ai All Right Reserved
    </div>
    <div class="Frame2148" :style="frame2148Style">
      <div class="Group2143" :style="group2143Style">
        <div class="Ellipse82" :style="ellipse82Style"></div>
        <div class="Facebook" :style="facebookStyle">
          <div class="Vector" :style="facebookVectorStyle"></div>
        </div>
      </div>
      <div class="Group2144" :style="group2144Style">
        <div class="Ellipse83" :style="ellipse83Style"></div>
        <div class="Instagram" :style="instagramStyle">
          <div class="Vector" :style="instagramVectorStyle"></div>
          <div class="Vector" :style="instagramInnerVectorStyle"></div>
          <div class="Vector" :style="instagramDotStyle"></div>
        </div>
      </div>
      <div class="Group2147" :style="group2147Style">
        <div class="Ellipse86" :style="ellipse86Style"></div>
        <div class="Twitter" :style="twitterStyle">
          <div class="Vector" :style="twitterVectorStyle"></div>
        </div>
      </div>
    </div>
    <div class="Frame1000003494" :style="frame1000003494Style">
      <img class="Abstract05" :style="abstract05Style" src="../assets/abstract-05.png" />
      <div class="AiImagesGenerator" :style="aiImagesGeneratorStyle">AI Images Generator</div>
    </div>
  </div>
</div>
</template>


<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

/* 提取的样式 */  
.LandingpageIndex11 {  
  /* max-width: 100%; /* 设置最大宽度 */   
  /* width:100%;
  margin-left: auto;  
  margin-right: auto; /* 水平居中 */   
  /* height: auto;    */
  /* position: fixed; */

  background: white;  
  display: flex;  
  flex-direction: column;  
  justify-content: flex-start;  
  align-items: center;  
  gap: 60px;
  /* overflow-x: hidden /* 防止水平滚动 */
  /* box-sizing: border-box; 包括内边距和边框在内的宽度和高度 */
}  
  
.Frame3644 {
  width: 100%;
  height: 120px;
  padding-left: 20px;
  padding-right: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  border-top-left-radius: 16px;
  border-top-right-radius: 16px;
  justify-content: space-between;
  align-items: center;
  display: inline-flex;
  
}
.ComponentLogo {
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
}
.Frame2186 {
  height: 56px;
  display: inline-flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
}
.AigAiImagesGenerator {
  width: 190px;
  height: auto;
  font-size: 24px;
  font-family: Nunito;
  font-weight: 700;
  letter-spacing: 0.24px;
  word-wrap: break-word;
}
.LogoText1 {
  color: #1D1D1D;
}
.LogoText2 {
  color: #797979;
  font-size: 14px;
  font-weight: 700;
  letter-spacing: 0.14px;
}
.MenuBar {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 40px;
}
.MenuText1, .MenuText2, .MenuText3 {
  color: #1D1D1D;
  font-size: 16px;
  font-family: Nunito;
  font-weight: 700;
  text-transform: capitalize;
  line-height: 24px;
  letter-spacing: 0.16px;
  word-wrap: break-word;
}
.Frame3646 {
  height: 40px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
}
.Frame31 {
  width: auto; /* 自适应宽度 */
  height: 40px;
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 12px;
  padding-bottom: 12px;
  border-radius: 16px;
  border: 1px #377DFF solid;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
  white-space: nowrap; /* 禁止换行 */
}
.LoadApp {
  color: #377DFF;
  font-size: 16px;
  font-family: Quicksand;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0.16px;
  word-wrap: break-word;
  overflow: hidden; /* 超出部分隐藏 */
  text-overflow: ellipsis; /* 超出部分显示省略号 */
}
.CommonUser {
  position: relative;
  width: 40px;
  height: 40px;
  cursor: pointer;
}

.AigAiImagesGenerator {
  width: 190px;
  height: 55px;
}
.AigAiImagesGenerator span:first-child {
  color: #1D1D1D;
  font-size: 24px;
  font-family: Nunito;
  font-weight: 700;
  letter-spacing: 0.24px;
  word-wrap: break-word;
}
.AigAiImagesGenerator span:last-child {
  color: #797979;
  font-size: 14px;
  font-family: Nunito;
  font-weight: 700;
  letter-spacing: 0.14px;
  word-wrap: break-word;
}

.Slogan {
  height: 296px;
  padding-left: 304px;
  padding-right: 304px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 30px;
  display: flex;
  width: 100%;
  margin-top: 60px;
  margin-bottom: 60px;

}
.Ai {
  width: 100%;
  height: 140px;
  text-align: center;
  color: #1D1D1D;
  font-size: 58px;
  font-family: Nunito;
  font-weight: 700;
  letter-spacing: 0.58px;
  word-wrap: break-word;
}

.StableDiffusionFineTuning {
  margin-top: 30px;
  width: 100%;
  opacity: 0.60;
  text-align: center;
  color: #1D1D1D;
  font-size: 16px;
  font-family: Nunito;
  font-weight: 400;
  line-height: 24px;
  letter-spacing: 0.16px;
  word-wrap: break-word;
}
.Frame32 {
  padding-left: 50px;
  padding-right: 50px;
  padding-top: 12px;
  padding-bottom: 12px;
  background: linear-gradient(143deg, #E6C7FF 0%, #C6E4FE 34%, #E6FBB8 67%, #F8F5B2 98%);
  box-shadow: 0px 4px 8px rgba(230, 199, 255, 0.60);
  border-radius: 16px;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 10px;
  display: flex;
  color: #1D1D1D;
  font-family: Quicksand;
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 150% */
  letter-spacing: 0.16px;
}

.screen {
  margin-top: 60px;
  margin-bottom: 60px;
  width: 100%;
  max-width: 1200px;
  height: 500px;
  position: relative;
  margin: 0 auto; /* 确保页面水平居中 */
}

.image7 {
  width: 500px;
  height: 500px;
  left: 50%;
  transform: translateX(-50%);
  position: absolute;
}

.designedfor {
  padding: 11px 13px;
  background: white;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.15);
  border-radius: 16px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 6px;
  display: inline-flex;
  position: absolute;
}

.text-small {
  width: 160px;
  height: 18px;
  color: #8E8E8E;
  font-size: 12px;
  font-family: Quicksand;
  font-weight: 700;
  line-height: 22px;
  letter-spacing: 0.12px;
  word-wrap: break-word;
}

.text-large {
  width: 157px;
  color: #1D1D1D;
  font-size: 16px;
  font-family: Nunito;
  font-weight: 700;
  letter-spacing: 0.16px;
  word-wrap: break-word;
}

.Feature {
  margin-bottom: 60px;
  margin-top: 60px; 
  width: 1200px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.Frame2177 {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 30px;
}
.title{
  color: #377dff;
  font-size: 20px;
  font-family: Nunito;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0.2px;
  word-wrap: break-word;
}
.StableDiffusion3 {
  width: 580px;
  height: 70px;
  color: #1d1d1d;
  font-size: 58px;
  font-family: Nunito;
  font-weight: 700;
  line-height: 75.4px;
  letter-spacing: 0.17px;
  word-wrap: break-word;
}
.StableDiffusion3Ai {
  width: 580px;
  color: #464646;
  font-size: 16px;
  font-family: Quicksand;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: 0.16px;
  word-wrap: break-word;
}
.Frame2175 {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 40px;
}
.Frame36, .Frame35 {
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 40px;
}

.Mission {
  width: 100%;
  height: 576px;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 30px;
  display: flex;
}

.subtitle {
  width: 1200px;
  height: 90px;
  text-align: center;
  color: #1d1d1d;
  font-size: 58px;
  font-family: Nunito;
  font-weight: 700;
  letter-spacing: 0.17px;
  word-wrap: break-word;
}

.mission_content {
  width: 1200px;
  justify-content: space-between;
  align-items: flex-start;
  display: inline-flex;
  display: grid;  
  grid-template-columns: 1fr 1fr; /* 定义两列，各占据一半的空间 */  
  gap: 10px; /* 可选：添加列和行之间的间距 */  
}

.Rectangle844 {
  width: 498px;
  height: 352px;
  background: linear-gradient(0deg, #d9d9d9 0%, #d9d9d9 100%);
  border-radius: 16px;
}

.AiAi {
  width: 650px;
  color: #464646;
  font-size: 16px;
  font-family: Nunito;
  font-weight: 400;
  line-height: 32px;
  letter-spacing: 0.16px;
  word-wrap: break-word;
}
.QA {
  margin-top: 60px;
  margin-bottom: 60px;
  width: 100%;
  padding-left: 184px;
  padding-right: 184px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  gap: 30px;

}

.Faq {
  width: 133px;
  height: 24px;
  text-align: center;
  color: #377dff;
  font-size: 20px;
  font-family: Nunito;
  font-weight: 700;
  line-height: 24px;
  letter-spacing: 0.2px;
  word-wrap: break-word;
}

.Frame2176 {
  width: 100%;
  padding: 30px;
  background: white;
  box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.1);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  gap: 20px;
}

.faq-item {
  width: 100%;
}

.faq-question {
  width: 100%;
  display: inline-flex;
  justify-content: space-between;
  align-items: center;
}

.faq-toggle {
  width: 24px;
  height: 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: none;
  background: none;
  cursor: pointer;
}

.arrow {
  width: 17.34px;
  height: 8.6px;
  background: white;
  transition: transform 0.3s ease;
}

.arrow[style*='rotate(180deg)'] {
  transform: rotate(180deg);
}

.Contactus {
  margin-top: '60px';
  margin-bottom: '60px';
  display: inline-flex;
}
.Frame2184 {
  display: inline-flex;
}
.Group2176 {
  position: relative;
}
.ComponentBottom {
  margin-top: '60px';
  margin-bottom: '60px';
  display: inline-flex;
}
</style>
