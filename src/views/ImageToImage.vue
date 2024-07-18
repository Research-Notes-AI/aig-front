<template>
<div class="Frame3657" style="width: 1328px; height: 1116px; border-top-left-radius: 16px; flex-direction: column; justify-content: flex-start; align-items: flex-start; display: inline-flex">
  <div class="Frame3653" style="align-self: stretch; height: 100px; padding: 20px; border-top-left-radius: 16px; border-bottom: 1px #E3E3E3 solid; justify-content: space-between; align-items: center; display: inline-flex">
    <div class="Frame3656" style="height: 100px; justify-content: flex-start; align-items: center; gap: 20px; display: flex">
      <div class="Frame3655" style="width: 49px; border-bottom: 2px #377DFF solid; justify-content: center; align-items: center; gap: 10px; display: flex">
        <div style="color: #1D1D1D; font-size: 16px; font-family: Nunito; font-weight: 700; text-transform: capitalize; line-height: 24px; letter-spacing: 0.16px; word-wrap: break-word">文生图</div>
      </div>
      <div class="Frame3655" style="width: 49px; justify-content: center; align-items: center; gap: 10px; display: flex">
        <div style="color: #8E8E8E; font-size: 16px; font-family: Nunito; font-weight: 700; text-transform: capitalize; line-height: 24px; letter-spacing: 0.16px; word-wrap: break-word">图生图</div>
      </div>
    </div>
    <div class="ComponentHistory" style="height: 40px; justify-content: flex-end; align-items: center; gap: 10px; display: flex">
      <div class="Frame1000003526" style="width: 120px; height: 40px; padding-left: 10px; padding-right: 10px; border-radius: 8px; border: 1px #017AFF solid; justify-content: space-between; align-items: center; display: flex">
        <div class="SdtoolsHistory" style="width: 24px; height: 24px; position: relative">
          <div class="Vector" style="width: 24px; height: 24px; left: 0px; top: 0px; position: absolute"></div>
          <div class="Vector" style="width: 2px; height: 6px; left: 12px; top: 8px; position: absolute; border: 1.33px #017AFF solid"></div>
          <div class="Vector" style="width: 17.95px; height: 18px; left: 3.05px; top: 2.91px; position: absolute; border: 1.33px #017AFF solid"></div>
        </div>
        <div style="width: 65px; height: 22px; color: #017AFF; font-size: 16px; font-family: Nunito; font-weight: 700; text-transform: capitalize; line-height: 24px; letter-spacing: 0.16px; word-wrap: break-word">历史任务</div>
      </div>
    </div>
  </div>
  <div class="Frame3658" style="align-self: stretch; background: #FCFCFC; border-top-left-radius: 16px; justify-content: flex-start; align-items: flex-start; display: inline-flex">
    <div class="Frame3654" style="width: 520px; height: 1016px; padding: 20px; background: white; border-right: 1px #E3E3E3 solid; flex-direction: column; justify-content: space-between; align-items: center; display: inline-flex">
      <div class="Frame3666" style="align-self: stretch; height: 730px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 40px; display: flex">
        <div class="Frame3665" style="align-self: stretch; height: 154px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 10px; display: flex">
          <div class="Frame3659" style="align-self: stretch; justify-content: space-between; align-items: center; display: inline-flex">
            <div style="color: #1D1D1D; font-size: 16px; font-family: Nunito; font-weight: 700; text-transform: capitalize; line-height: 24px; letter-spacing: 0.16px; word-wrap: break-word">提示词</div>
            <div class="text-count" style="color: #8E8E8E; font-size: 12px; font-family: Nunito; font-weight: 700; text-transform: capitalize; line-height: 24px; letter-spacing: 0.12px; word-wrap: break-word">{{ keywordsInput.length }}/1000</div>
          </div>
          <textarea
            v-model="keywordsInput"
            @input="updateText"
            placeholder="输入提示词"
            :class="{ 'input-error': isKeywordInputEmpty }"
        ></textarea>
        </div>
        <div class="Frame3664" style="align-self: stretch; height: 114px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 10px; display: flex">
          <div class="Frame3659" style="align-self: stretch; justify-content: space-between; align-items: center; display: inline-flex">
            <div style="color: #1D1D1D; font-size: 16px; font-family: Nunito; font-weight: 700; text-transform: capitalize; line-height: 24px; letter-spacing: 0.16px; word-wrap: break-word">反向提示词</div>
            <div class="1000" style="color: #8E8E8E; font-size: 12px; font-family: Nunito; font-weight: 700; text-transform: capitalize; line-height: 24px; letter-spacing: 0.12px; word-wrap: break-word">0/1000</div>
          </div>
          <div class="Frame3653" style="align-self: stretch; height: 80px; padding-left: 20px; padding-right: 20px; mix-blend-mode: multiply; background: white; border-radius: 8px; border: 1px #E3E3E3 solid; justify-content: flex-start; align-items: center; gap: 113px; display: inline-flex">
            <div style="color: #8E8E8E; font-size: 16px; font-family: Nunito; font-weight: 400; text-transform: capitalize; line-height: 24px; letter-spacing: 0.16px; word-wrap: break-word">输入反向提示词</div>
          </div>
        </div>
        <div class="Frame1000003489" style="align-self: stretch; justify-content: space-between; align-items: center; display: inline-flex">
          <div style="color: #1D1D1D; font-size: 16px; font-family: Nunito; font-weight: 700; text-transform: capitalize; line-height: 24px; letter-spacing: 0.16px; word-wrap: break-word">图片数量</div>
          <div class="Frame1000003489" style="justify-content: flex-start; align-items: center; gap: 20px; display: flex">
            <div class="Frame1000003487" style="width: 86px; padding-left: 10px; padding-right: 10px; padding-top: 11px; padding-bottom: 11px; background: white; border-radius: 4px; border: 1px #B0B0B0 solid; justify-content: flex-start; align-items: center; gap: 10px; display: flex">
              <div class="CommonImagessmall" style="width: 16px; height: 16px; position: relative">
                <div class="Vector" style="width: 16px; height: 16px; left: 0px; top: 0px; position: absolute"></div>
                <div class="Vector" style="width: 0.01px; height: 0px; left: 10px; top: 5.33px; position: absolute; border: 1.33px #A1A3AA solid"></div>
                <div class="Vector" style="width: 10.67px; height: 10.67px; left: 2.67px; top: 2.67px; position: absolute; border: 1.33px #A1A3AA solid"></div>
                <div class="Vector" style="width: 8px; height: 3.78px; left: 2.67px; top: 6.89px; position: absolute; border: 1.33px #A1A3AA solid"></div>
                <div class="Vector" style="width: 4px; height: 1.78px; left: 9.33px; top: 8.22px; position: absolute; border: 1.33px #A1A3AA solid"></div>
              </div>
              <div style="text-align: center; color: black; font-size: 12px; font-family: Noto Sans SC; font-weight: 400; word-wrap: break-word">10</div>
              <div class="SdtoolsArrowdown" style="width: 16px; height: 16px; position: relative">
                <div class="Vector" style="width: 16px; height: 16px; left: 0px; top: 0px; position: absolute"></div>
                <div class="Vector" style="width: 8px; height: 4px; left: 4px; top: 6px; position: absolute; border: 2px #A1A3AA solid"></div>
              </div>
            </div>
          </div>
        </div>
        <div class="Frame1000003488" style="align-self: stretch; justify-content: space-between; align-items: center; display: inline-flex">
          <div style="color: #1D1D1D; font-size: 16px; font-family: Nunito; font-weight: 700; text-transform: capitalize; line-height: 24px; letter-spacing: 0.16px; word-wrap: break-word">图片尺寸</div>
          <div class="Frame1000003489" style="justify-content: flex-start; align-items: center; gap: 20px; display: flex">
            <div class="Frame1000003487" style="width: 70px; height: 30px; padding-left: 10px; padding-right: 10px; padding-top: 11px; padding-bottom: 11px; background: white; border-radius: 4px; border: 1px #B0B0B0 solid; justify-content: space-between; align-items: center; display: flex">
              <div class="CommonWidth" style="width: 16px; height: 16px; position: relative">
                <div class="Vector" style="width: 16px; height: 16px; left: 0px; top: 0px; position: absolute"></div>
                <div class="Vector" style="width: 10.67px; height: 5.33px; left: 2.67px; top: 2.67px; position: absolute; border: 1.33px #A1A3AA solid"></div>
                <div class="Vector" style="width: 4.67px; height: 0px; left: 2px; top: 12px; position: absolute; border: 1.33px #A1A3AA solid"></div>
                <div class="Vector" style="width: 4.67px; height: 0px; left: 9.33px; top: 12px; position: absolute; border: 1.33px #A1A3AA solid"></div>
                <div class="Vector" style="width: 2px; height: 4px; left: 2px; top: 10px; position: absolute; border: 1.33px #A1A3AA solid"></div>
                <div class="Vector" style="width: 2px; height: 4px; left: 12px; top: 10px; position: absolute; border: 1.33px #A1A3AA solid"></div>
              </div>
              <div style="text-align: center; color: black; font-size: 12px; font-family: Noto Sans SC; font-weight: 400; word-wrap: break-word">512</div>
            </div>
            <div class="Frame1000003487" style="width: 70px; height: 30px; padding-left: 10px; padding-right: 10px; padding-top: 11px; padding-bottom: 11px; background: white; border-radius: 4px; border: 1px #B0B0B0 solid; justify-content: space-between; align-items: center; display: flex">
              <div class="CommonHight" style="width: 16px; height: 16px; position: relative">
                <div class="Vector" style="width: 16px; height: 16px; left: 0px; top: 0px; position: absolute"></div>
                <div class="Vector" style="width: 5.33px; height: 10.67px; left: 2.67px; top: 2.67px; position: absolute; border: 1.33px #A1A3AA solid"></div>
                <div class="Vector" style="width: 0px; height: 4.67px; left: 12px; top: 9.33px; position: absolute; border: 1.33px #A1A3AA solid"></div>
                <div class="Vector" style="width: 0px; height: 4.67px; left: 12px; top: 2px; position: absolute; border: 1.33px #A1A3AA solid"></div>
                <div class="Vector" style="width: 4px; height: 2px; left: 10px; top: 12px; position: absolute; border: 1.33px #A1A3AA solid"></div>
                <div class="Vector" style="width: 4px; height: 2px; left: 10px; top: 2px; position: absolute; border: 1.33px #A1A3AA solid"></div>
              </div>
              <div style="text-align: center; color: black; font-size: 12px; font-family: Noto Sans SC; font-weight: 400; word-wrap: break-word">512</div>
            </div>
          </div>
        </div>
        <div class="Frame1000003491" style="align-self: stretch; height: 40px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 10px; display: flex">
          <div class="Frame1000003490" style="align-self: stretch; justify-content: space-between; align-items: center; display: inline-flex">
            <div class="Frame1000003524" style="width: 392px; height: 40px; flex-direction: column; justify-content: space-between; align-items: flex-start; display: inline-flex">
              <div style="width: 392px; color: #1D1D1D; font-size: 16px; font-family: Nunito; font-weight: 700; text-transform: capitalize; line-height: 24px; letter-spacing: 0.16px; word-wrap: break-word">迭代步数</div>
              <div class="25" style="width: 382px; height: 18px; color: #8E8E8E; font-size: 12px; font-family: Nunito; font-weight: 700; text-transform: capitalize; line-height: 24px; letter-spacing: 0.12px; word-wrap: break-word">迭代步数越多细节越多，但更消耗时间，默认值 25</div>
            </div>
            <div class="Frame1000003489" style="justify-content: flex-start; align-items: center; gap: 20px; display: flex">
              <div class="Frame1000003487" style="width: 70px; height: 30px; padding-left: 10px; padding-right: 10px; padding-top: 11px; padding-bottom: 11px; background: white; border-radius: 4px; border: 1px #B0B0B0 solid; justify-content: space-between; align-items: center; display: flex">
                <div class="CommonSteps" style="width: 16px; height: 16px; position: relative">
                  <div class="Vector" style="width: 16px; height: 16px; left: 0px; top: 0px; position: absolute"></div>
                  <div class="Vector" style="width: 10.67px; height: 8px; left: 2.67px; top: 4px; position: absolute; border: 1.33px #A1A3AA solid"></div>
                </div>
                <div style="text-align: center; color: black; font-size: 12px; font-family: Noto Sans SC; font-weight: 400; word-wrap: break-word">25</div>
              </div>
            </div>
          </div>
        </div>
        <div class="Frame3663" style="align-self: stretch; height: 82px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 10px; display: flex">
          <div class="Frame3662" style="align-self: stretch; justify-content: flex-start; align-items: center; display: inline-flex">
            <div style="color: #1D1D1D; font-size: 16px; font-family: Nunito; font-weight: 700; text-transform: capitalize; line-height: 24px; letter-spacing: 0.16px; word-wrap: break-word">图片与提示词的相关性</div>
          </div>
          <div class="SdtoolsBar" style="width: 480px; height: 20px; position: relative">
            <div class="Shape" style="width: 145.05px; height: 4px; left: 334.95px; top: 8px; position: absolute; background: #E5E5E5; box-shadow: 0px 0px 1px 1px #E3E3E3 inset; border-radius: 11px"></div>
            <div class="Shape" style="width: 334.95px; height: 4px; left: 0px; top: 8px; position: absolute; background: #017AFF; border-radius: 11px"></div>
            <div class="Shape" style="width: 4.75px; height: 8px; left: 0px; top: 6px; position: absolute">
              <div class="Shape" style="width: 2px; height: 8px; left: 0px; top: 0px; position: absolute; background: #017AFF; border-radius: 11px"></div>
            </div>
            <div class="Shape" style="width: 4.75px; height: 8px; left: 285.15px; top: 6px; position: absolute">
              <div class="Shape" style="width: 2px; height: 8px; left: 1px; top: 0px; position: absolute; background: #017AFF; border-radius: 11px"></div>
            </div>
            <div class="Shape" style="width: 4.75px; height: 8px; left: 332.67px; top: 6px; position: absolute">
              <div class="Shape" style="width: 2px; height: 8px; left: 1px; top: 0px; position: absolute; background: #017AFF; border-radius: 11px"></div>
            </div>
            <div class="Shape" style="width: 4.75px; height: 8px; left: 95.05px; top: 6px; position: absolute">
              <div class="Shape" style="width: 2px; height: 8px; left: 1px; top: 0px; position: absolute; background: #017AFF; border-radius: 11px"></div>
            </div>
            <div class="Shape" style="width: 4.75px; height: 8px; left: 380.20px; top: 6px; position: absolute">
              <div class="Shape" style="width: 2px; height: 8px; left: 1px; top: 0px; position: absolute; background: #E5E5E5; border-radius: 11px"></div>
            </div>
            <div class="Shape" style="width: 4.75px; height: 8px; left: 142.57px; top: 6px; position: absolute">
              <div class="Shape" style="width: 2px; height: 8px; left: 1px; top: 0px; position: absolute; background: #017AFF; border-radius: 11px"></div>
            </div>
            <div class="Shape" style="width: 4.75px; height: 8px; left: 427.72px; top: 6px; position: absolute">
              <div class="Shape" style="width: 2px; height: 8px; left: 1px; top: 0px; position: absolute; background: #E5E5E5; border-radius: 11px"></div>
            </div>
            <div class="Shape" style="width: 4.75px; height: 8px; left: 190.10px; top: 6px; position: absolute">
              <div class="Shape" style="width: 2px; height: 8px; left: 1px; top: 0px; position: absolute; background: #017AFF; border-radius: 11px"></div>
            </div>
            <div class="Shape" style="width: 2px; height: 8px; left: 478px; top: 6px; position: absolute">
              <div class="Shape" style="width: 2px; height: 8px; left: 0px; top: 0px; position: absolute; background: #E5E5E5; border-radius: 11px"></div>
            </div>
            <div class="Shape" style="width: 4.75px; height: 8px; left: 237.62px; top: 6px; position: absolute">
              <div class="Shape" style="width: 2px; height: 8px; left: 1px; top: 0px; position: absolute; background: #017AFF; border-radius: 11px"></div>
            </div>
            <div class="Shape" style="width: 4.75px; height: 8px; left: 47.52px; top: 6px; position: absolute">
              <div class="Shape" style="width: 2px; height: 8px; left: 1px; top: 0px; position: absolute; background: #017AFF; border-radius: 11px"></div>
            </div>
            <div class="Frame24" style="width: 19.01px; height: 20px; left: 325.54px; top: 0px; position: absolute">
              <div class="Bg" style="width: 8px; height: 20px; left: 6px; top: 0px; position: absolute; background: white; box-shadow: 0px 0px 2px rgba(0, 0, 0, 0.20); border-radius: 5px"></div>
            </div>
          </div>
          <div class="Frame3660" style="align-self: stretch; justify-content: space-between; align-items: center; display: inline-flex">
            <div style="width: 49px; height: 18px; color: #8E8E8E; font-size: 12px; font-family: Nunito; font-weight: 700; text-transform: capitalize; line-height: 24px; letter-spacing: 0.12px; word-wrap: break-word">更有创意</div>
            <div style="width: 73px; height: 18px; color: #8E8E8E; font-size: 12px; font-family: Nunito; font-weight: 700; text-transform: capitalize; line-height: 24px; letter-spacing: 0.12px; word-wrap: break-word">更贴近提示词</div>
          </div>
        </div>
        <div class="Frame1000003492" style="align-self: stretch; height: 40px; flex-direction: column; justify-content: flex-start; align-items: flex-start; gap: 10px; display: flex">
          <div class="Frame1000003490" style="align-self: stretch; justify-content: space-between; align-items: center; display: inline-flex">
            <div class="Frame1000003524" style="width: 392px; height: 40px; flex-direction: column; justify-content: space-between; align-items: flex-start; display: inline-flex">
              <div style="width: 392px; color: #1D1D1D; font-size: 16px; font-family: Nunito; font-weight: 700; text-transform: capitalize; line-height: 24px; letter-spacing: 0.16px; word-wrap: break-word">种子</div>
              <div style="width: 382px; height: 18px; color: #8E8E8E; font-size: 12px; font-family: Nunito; font-weight: 700; text-transform: capitalize; line-height: 24px; letter-spacing: 0.12px; word-wrap: break-word">默认为随机种子</div>
            </div>
            <div class="Frame1000003489" style="justify-content: flex-start; align-items: center; gap: 20px; display: flex">
              <div class="Frame1000003487" style="width: 100px; height: 30px; padding-left: 10px; padding-right: 10px; padding-top: 11px; padding-bottom: 11px; background: white; border-radius: 4px; border: 1px #B0B0B0 solid; justify-content: space-between; align-items: center; display: flex">
                <div class="SdtoolsSeed" style="width: 16px; height: 16px; position: relative">
                  <div class="Vector" style="width: 16px; height: 16px; left: 0px; top: 0px; position: absolute"></div>
                  <div class="Vector" style="width: 6px; height: 5.33px; left: 2px; top: 2.67px; position: absolute; border: 1.33px #A1A3AA solid"></div>
                  <div class="Vector" style="width: 6px; height: 4.67px; left: 8px; top: 5.33px; position: absolute; border: 1.33px #A1A3AA solid"></div>
                  <div class="Vector" style="width: 0px; height: 6.67px; left: 8px; top: 6.67px; position: absolute; border: 1.33px #A1A3AA solid"></div>
                </div>
                <div style="text-align: center; color: black; font-size: 12px; font-family: Noto Sans SC; font-weight: 400; word-wrap: break-word">88778123</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="Frame3" style="align-self: stretch; height: 60px; padding-left: 50px; padding-right: 50px; padding-top: 12px; padding-bottom: 12px; background: #377DFF; border-radius: 8px; justify-content: center; align-items: center; gap: 10px; display: inline-flex">
        <div style="color: white; font-size: 16px; font-family: Quicksand; font-weight: 700; line-height: 24px; letter-spacing: 0.16px; word-wrap: break-word">生成图片</div>
      </div>
    </div>
    <div class="Frame3655" style="flex: 1 1 0; height: 1016px; padding: 20px; background: #FCFCFC; flex-direction: column; justify-content: flex-start; align-items: center; gap: 20px; display: inline-flex">
      <div class="Frame1000003527" style="justify-content: center; align-items: flex-start; gap: 20px; display: inline-flex">
        <div class="Frame1000003531" style="width: 144px; height: 144px; position: relative">
          <img class="Image1" style="width: 144px; height: 144px; left: 0px; top: 0px; position: absolute; border-radius: 8px; border: 4px #017AFF solid" src="https://via.placeholder.com/144x144" />
          <div class="Rectangle845" style="width: 30px; height: 30px; left: 57px; top: 57px; position: absolute; background: rgba(0, 0, 0, 0.50); border-radius: 16px; border: 0.30px white solid"></div>
          <div class="SdtoolsDownload" style="width: 16px; height: 16px; left: 64px; top: 64px; position: absolute">
            <div class="Vector" style="width: 16px; height: 16px; left: 0px; top: 0px; position: absolute"></div>
            <div class="Vector" style="width: 10.67px; height: 2.67px; left: 2.67px; top: 11.33px; position: absolute; border: 1.33px white solid"></div>
            <div class="Vector" style="width: 6.67px; height: 3.33px; left: 4.67px; top: 7.33px; position: absolute; border: 1.33px white solid"></div>
            <div class="Vector" style="width: 0px; height: 8px; left: 8px; top: 2.67px; position: absolute; border: 1.33px white solid"></div>
          </div>
          <div class="Pointer" style="width: 19px; height: 22px; left: 87px; top: 133px; position: absolute; background: #111111; box-shadow: 0px 2.5px 7.5px rgba(0, 0, 0, 0.35); border: 2.50px white solid"></div>
        </div>
        <img class="Image2" style="width: 144px; height: 144px; border-radius: 8px" src="https://via.placeholder.com/144x144" />
      </div>
      <div class="Frame1000003528" style="justify-content: center; align-items: flex-start; gap: 20px; display: inline-flex">
        <img class="Image3" style="width: 144px; height: 144px; border-radius: 8px" src="https://via.placeholder.com/144x144" />
        <img class="Image4" style="width: 144px; height: 144px; border-radius: 8px" src="https://via.placeholder.com/144x144" />
      </div>
      <div class="Frame1000003529" style="justify-content: center; align-items: flex-start; gap: 20px; display: inline-flex">
        <div class="Frame7126" style="width: 144px; height: 144px; padding: 10px; border-radius: 8px; border: 2px #E5E5E5 solid; justify-content: center; align-items: center; gap: 10px; display: flex">
          <div class="Group21" style="width: 44px; height: 44px; position: relative">
            <div class="Ellipse1" style="width: 44px; height: 44px; left: 0px; top: 0px; position: absolute; border-radius: 9999px; border: 6px #E3E5ED solid"></div>
            <div class="Ellipse2" style="width: 44px; height: 44px; left: 0px; top: 0px; position: absolute; border-radius: 9999px; border: 6px #017AFF solid"></div>
          </div>
        </div>
        <div class="Frame7127" style="width: 144px; height: 144px; padding: 10px; border-radius: 8px; border: 2px #E5E5E5 solid; justify-content: center; align-items: center; gap: 10px; display: flex">
          <div class="Ellipse1" style="width: 44px; height: 44px; border-radius: 9999px; border: 6px #E3E5ED solid"></div>
        </div>
      </div>
      <div class="Frame1000003530" style="width: 308px; justify-content: flex-start; align-items: flex-start; gap: 20px; display: inline-flex">
        <div class="Frame7127" style="width: 144px; height: 144px; padding: 10px; border-radius: 8px; border: 2px #E5E5E5 solid; justify-content: center; align-items: center; gap: 10px; display: flex">
          <div class="Ellipse1" style="width: 44px; height: 44px; border-radius: 9999px; border: 6px #E3E5ED solid"></div>
        </div>
      </div>
      <div class="Frame3644" style="width: 308px; height: 80px; padding-left: 20px; padding-right: 20px; padding-top: 28px; padding-bottom: 28px; border-radius: 8px; border: 1px #377DFF solid; justify-content: space-between; align-items: center; display: inline-flex">
        <div class="Frame3649" style="height: 44px; justify-content: flex-start; align-items: center; gap: 20px; display: flex">
          <div class="SdtoolsDownload" style="width: 24px; height: 24px; position: relative">
            <div class="Vector" style="width: 24px; height: 24px; left: 0px; top: 0px; position: absolute"></div>
            <div class="Vector" style="width: 16px; height: 4px; left: 4px; top: 17px; position: absolute; border: 1.33px #0179FC solid"></div>
            <div class="Vector" style="width: 10px; height: 5px; left: 7px; top: 11px; position: absolute; border: 1.33px #0179FC solid"></div>
            <div class="Vector" style="width: 0px; height: 12px; left: 12px; top: 4px; position: absolute; border: 1.33px #0179FC solid"></div>
          </div>
          <div class="Frame3647" style="flex-direction: column; justify-content: center; align-items: flex-start; gap: 2px; display: inline-flex">
            <div style="color: #1D1D1D; font-size: 16px; font-family: Nunito; font-weight: 700; text-transform: capitalize; line-height: 24px; letter-spacing: 0.16px; word-wrap: break-word">全部下载</div>
            <div style="width: 142px; height: 18px; color: #8E8E8E; font-size: 12px; font-family: Quicksand; font-weight: 700; line-height: 22px; letter-spacing: 0.12px; word-wrap: break-word">打包下载生成的所有图片</div>
          </div>
        </div>
      </div>
    </div>
    <div class="Frame3656" style="width: 459px; height: 1016px; padding-top: 20px; padding-bottom: 20px; background: #FCFCFC; border-top-left-radius: 16px; flex-direction: column; justify-content: flex-start; align-items: center; gap: 20px; display: inline-flex">
      <div class="Frame1000003516" style="width: 420px; justify-content: space-between; align-items: center; display: inline-flex">
        <div style="width: 129px; height: 18px; color: #8E8E8E; font-size: 12px; font-family: Quicksand; font-weight: 700; line-height: 32px; letter-spacing: 0.12px; word-wrap: break-word">预览</div>
        <div class="SdtoolsClose" style="width: 16px; height: 16px; position: relative">
          <div class="Vector" style="width: 16px; height: 16px; left: 0px; top: 0px; position: absolute"></div>
          <div class="Vector6" style="width: 10px; height: 10px; left: 3px; top: 3px; position: absolute; border: 1.33px #797979 solid"></div>
          <div class="Vector7" style="width: 10px; height: 10px; left: 13px; top: 3px; position: absolute; transform: rotate(180deg); transform-origin: 0 0; border: 1.33px #797979 solid"></div>
        </div>
      </div>
      <div class="Line12" style="width: 420px; height: 0px; border: 1px #E3E3E3 solid"></div>
      <img class="Image1" style="width: 420px; height: 420px; border-radius: 8px" src="https://via.placeholder.com/420x420" />
      <div class="Frame1000003517" style="width: 420px; justify-content: space-between; align-items: center; display: inline-flex">
        <div class="Frame1000003519" style="width: 60px; height: 46px; flex-direction: column; justify-content: space-between; align-items: center; display: inline-flex">
          <div class="SdtoolsDownload" style="width: 24px; height: 24px; position: relative">
            <div class="Vector" style="width: 24px; height: 24px; left: 0px; top: 0px; position: absolute"></div>
            <div class="Vector" style="width: 16px; height: 4px; left: 4px; top: 17px; position: absolute; border: 1.33px #1D1D1D solid"></div>
            <div class="Vector" style="width: 10px; height: 5px; left: 7px; top: 11px; position: absolute; border: 1.33px #1D1D1D solid"></div>
            <div class="Vector" style="width: 0px; height: 12px; left: 12px; top: 4px; position: absolute; border: 1.33px #1D1D1D solid"></div>
          </div>
          <div style="width: 62px; height: 18px; text-align: center; color: #1D1D1D; font-size: 12px; font-family: Quicksand; font-weight: 700; line-height: 32px; letter-spacing: 0.12px; word-wrap: break-word">下载</div>
        </div>
        <div class="Frame1000003523" style="width: 60px; height: 46px; flex-direction: column; justify-content: space-between; align-items: center; display: inline-flex">
          <div class="SdtoolsStarFull" style="width: 24px; height: 24px; position: relative">
            <div class="Vector" style="width: 24px; height: 24px; left: 0px; top: 0px; position: absolute"></div>
            <div class="Vector" style="width: 19.97px; height: 18.99px; left: 2.01px; top: 2px; position: absolute; background: #017AFF; border: 1.33px #017AFF solid"></div>
          </div>
          <div style="width: 62px; height: 18px; text-align: center; color: #017AFF; font-size: 12px; font-family: Quicksand; font-weight: 700; line-height: 32px; letter-spacing: 0.12px; word-wrap: break-word">喜欢</div>
        </div>
        <div class="Frame1000003522" style="width: 60px; height: 46px; flex-direction: column; justify-content: space-between; align-items: center; display: inline-flex">
          <div class="SdtoolsDelete" style="width: 24px; height: 24px; position: relative">
            <div class="Vector" style="width: 24px; height: 24px; left: 0px; top: 0px; position: absolute"></div>
            <div class="Vector" style="width: 16px; height: 0px; left: 4px; top: 7px; position: absolute; border: 1.33px #1D1D1D solid"></div>
            <div class="Vector" style="width: 0px; height: 6px; left: 10px; top: 11px; position: absolute; border: 1.33px #1D1D1D solid"></div>
            <div class="Vector" style="width: 0px; height: 6px; left: 14px; top: 11px; position: absolute; border: 1.33px #1D1D1D solid"></div>
            <div class="Vector" style="width: 14px; height: 14px; left: 5px; top: 7px; position: absolute; border: 1.33px #1D1D1D solid"></div>
            <div class="Vector" style="width: 6px; height: 4px; left: 9px; top: 3px; position: absolute; border: 1.33px #1D1D1D solid"></div>
          </div>
          <div style="width: 62px; height: 18px; text-align: center; color: #1D1D1D; font-size: 12px; font-family: Quicksand; font-weight: 700; line-height: 32px; letter-spacing: 0.12px; word-wrap: break-word">删除</div>
        </div>
      </div>
      <div class="Line13" style="width: 420px; height: 0px; border: 1px #E3E3E3 solid"></div>
      <div class="Frame1000003518" style="width: 420px; justify-content: space-between; align-items: center; display: inline-flex">
        <div style="width: 49px; height: 18px; color: #1D1D1D; font-size: 12px; font-family: Nunito; font-weight: 700; text-transform: capitalize; line-height: 24px; letter-spacing: 0.12px; word-wrap: break-word">生成方式</div>
        <div style="width: 282px; height: 18px; text-align: right; color: #8E8E8E; font-size: 12px; font-family: Quicksand; font-weight: 700; line-height: 32px; letter-spacing: 0.12px; word-wrap: break-word">中文生图 / 文生图</div>
      </div>
      <div class="Line14" style="width: 420px; height: 0px; border: 1px #E3E3E3 solid"></div>
      <div class="Frame1000003521" style="width: 420px; justify-content: space-between; align-items: center; display: inline-flex">
        <div style="width: 49px; height: 18px; color: #1D1D1D; font-size: 12px; font-family: Nunito; font-weight: 700; text-transform: capitalize; line-height: 24px; letter-spacing: 0.12px; word-wrap: break-word">提示词</div>
        <div class="Dasd" style="width: 298px; height: 18px; text-align: right; color: #8E8E8E; font-size: 12px; font-family: Quicksand; font-weight: 700; line-height: 32px; letter-spacing: 0.12px; word-wrap: break-word">阿斯顿发送到dasd发生的分噶大哥为让温泉饿发生</div>
      </div>
      <div class="Line17" style="width: 420px; height: 0px; border: 1px #E3E3E3 solid"></div>
      <div class="Frame1000003524" style="width: 420px; justify-content: space-between; align-items: center; display: inline-flex">
        <div style="color: #1D1D1D; font-size: 12px; font-family: Nunito; font-weight: 700; text-transform: capitalize; line-height: 24px; letter-spacing: 0.12px; word-wrap: break-word">反向提示词</div>
        <div class="Dasd" style="width: 298px; height: 18px; text-align: right; color: #8E8E8E; font-size: 12px; font-family: Quicksand; font-weight: 700; line-height: 32px; letter-spacing: 0.12px; word-wrap: break-word">阿斯顿发送到dasd发生的分噶大哥为让温泉饿发生</div>
      </div>
      <div class="Line20" style="width: 420px; height: 0px; border: 1px #E3E3E3 solid"></div>
      <div class="Frame1000003519" style="width: 420px; justify-content: space-between; align-items: center; display: inline-flex">
        <div style="width: 63px; height: 18px; color: #1D1D1D; font-size: 12px; font-family: Nunito; font-weight: 700; text-transform: capitalize; line-height: 24px; letter-spacing: 0.12px; word-wrap: break-word">创建时间</div>
        <div class="430123458" style="width: 183px; height: 18px; text-align: right; color: #8E8E8E; font-size: 12px; font-family: Quicksand; font-weight: 700; line-height: 32px; letter-spacing: 0.12px; word-wrap: break-word">2024-4-30 12:34:58</div>
      </div>
      <div class="Line15" style="width: 420px; height: 0px; border: 1px #E3E3E3 solid"></div>
      <div class="Frame1000003520" style="width: 420px; justify-content: space-between; align-items: center; display: inline-flex">
        <div style="width: 49px; height: 18px; color: #1D1D1D; font-size: 12px; font-family: Nunito; font-weight: 700; text-transform: capitalize; line-height: 24px; letter-spacing: 0.12px; word-wrap: break-word">分辨率</div>
        <div class="800Px" style="width: 183px; height: 18px; text-align: right; color: #8E8E8E; font-size: 12px; font-family: Quicksand; font-weight: 700; line-height: 32px; letter-spacing: 0.12px; word-wrap: break-word">800 × 800 px</div>
      </div>
      <div class="Line16" style="width: 420px; height: 0px; border: 1px #E3E3E3 solid"></div>
      <div class="Frame1000003523" style="width: 420px; justify-content: space-between; align-items: center; display: inline-flex">
        <div style="width: 49px; height: 18px; color: #1D1D1D; font-size: 12px; font-family: Nunito; font-weight: 700; text-transform: capitalize; line-height: 24px; letter-spacing: 0.12px; word-wrap: break-word">步数</div>
        <div style="width: 183px; height: 18px; text-align: right; color: #8E8E8E; font-size: 12px; font-family: Quicksand; font-weight: 700; line-height: 32px; letter-spacing: 0.12px; word-wrap: break-word">25</div>
      </div>
      <div class="Line19" style="width: 420px; height: 0px; border: 1px #E3E3E3 solid"></div>
      <div class="Frame1000003522" style="width: 420px; justify-content: space-between; align-items: center; display: inline-flex">
        <div style="width: 49px; height: 18px; color: #1D1D1D; font-size: 12px; font-family: Nunito; font-weight: 700; text-transform: capitalize; line-height: 24px; letter-spacing: 0.12px; word-wrap: break-word">种子</div>
        <div style="width: 183px; height: 18px; text-align: right; color: #8E8E8E; font-size: 12px; font-family: Quicksand; font-weight: 700; line-height: 32px; letter-spacing: 0.12px; word-wrap: break-word">8877284</div>
      </div>
      <div class="Line18" style="width: 420px; height: 0px; border: 1px #E3E3E3 solid"></div>
    </div>
  </div>
</div>
</template>
<script setup lang="ts">
</script>
<style>
textarea {
  font-size: 16px;
  font-family: Arial, sans-serif;
  resize: vertical;
  align-self: stretch;
  height: 80px; 
  width:95%;
  padding-left:20px; 
  padding-right:20px; 
  mix-blend-mode:multiply; 
  background: white; 
  border-radius: 8px; 
  border: 1px #E5E5E5 solid;
  justify-content: flex-start; 
  align-items: center; gap: 113px; 
  display: inline-flex
}</style>