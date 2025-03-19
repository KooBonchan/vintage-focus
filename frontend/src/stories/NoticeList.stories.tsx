import React from "react";
import { StoryFn, Meta } from "@storybook/react";
import NoticeList from "../components/NoticeList"; // 경로가 동일 디렉토리라면 수정 필요

/**
 * NoticeList 컴포넌트는 중요한 공지 사항을 리스트 형태로 표시합니다.
 * Material-UI를 기반으로 반응형 그리드 레이아웃을 사용하며, 아이콘과 텍스트로 구성된 공지 항목을 렌더링합니다.
 * 커스터마이징을 위해 아이콘 색상, 배경 색상, 폰트 색상을 프롭스로 제공합니다.
 */
const meta: Meta<typeof NoticeList> = {
  title: "Components/NoticeList",
  component: NoticeList,
  parameters: {
    docs: {
      description: {
        component:
          "NoticeList는 사용자에게 필수 공지 사항을 시각적으로 강조하여 전달하는 컴포넌트입니다. " +
          "아이콘과 텍스트로 구성된 공지 항목을 그리드 형태로 배치하며, 반응형 디자인을 지원합니다. " +
          "프롭스를 통해 스타일을 동적으로 조정할 수 있습니다.",
      },
    },
  },
  argTypes: {
    iconColor: {
      control: "color",
      description: "공지 항목 옆에 표시되는 아이콘의 색상입니다.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "#445366" },
      },
    },
    backgroundColor: {
      control: "color",
      description: "컴포넌트 전체의 배경 색상입니다.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "#f3f8fb" },
      },
    },
    fontColor: {
      control: "color",
      description: "제목과 본문 텍스트의 색상입니다.",
      table: {
        type: { summary: "string" },
        defaultValue: { summary: "#445366" },
      },
    },
  },
  tags: ["autodocs"], // 자동 문서화 활성화
} as Meta<typeof NoticeList>;

const Template: StoryFn<typeof NoticeList> = (args) => <NoticeList {...args} />;

// 기본 스토리: 디폴트 설정
export const Default = Template.bind({});
Default.args = {
  iconColor: "#445366",
  backgroundColor: "#f3f8fb",
  fontColor: "#445366",
};
Default.parameters = {
  docs: {
    description: {
      story: "기본 설정으로 렌더링된 NoticeList입니다. 기본 색상을 사용합니다.",
    },
  },
};

// 밝은 테마 예시
export const LightTheme = Template.bind({});
LightTheme.args = {
  iconColor: "#0288d1",
  backgroundColor: "#e3f2fd",
  fontColor: "#0277bd",
};
LightTheme.parameters = {
  docs: {
    description: {
      story: "밝은 테마를 적용한 NoticeList입니다. 아이콘과 텍스트 색상이 더 밝고 생동감 있게 설정되었습니다.",
    },
  },
};

// 다크 테마 예시
export const DarkTheme = Template.bind({});
DarkTheme.args = {
  iconColor: "#ffffff",
  backgroundColor: "#424242",
  fontColor: "#ffffff",
};
DarkTheme.parameters = {
  docs: {
    description: {
      story: "다크 테마를 적용한 NoticeList입니다. 어두운 배경과 흰색 텍스트로 대비를 강조했습니다.",
    },
  },
};

export default meta;