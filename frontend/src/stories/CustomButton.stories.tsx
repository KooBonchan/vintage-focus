import { Meta, StoryObj } from '@storybook/react';
import CustomButton from '../components/CustomButton';  // CustomButton으로 변경

const meta: Meta<typeof CustomButton> = {
  title: 'Components/CustomButton',  // 제목 변경
  component: CustomButton,  // 컴포넌트 변경
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `**ProductDetail**  
          ## 기본 사용 예시  
          이 컴포넌트는 버튼 정보를 표시하며, 하단 size 부분에서 다른 사이즈와 색상의 버튼을 제공합니다.  `,
      },
    },
  },
  argTypes: {
    label: {
      description: 'The text displayed on the button',
      control: 'text',  // 텍스트 입력 방식으로 control 설정
    },
    size: {
      description: 'The size of the button',
      control: 'select',  // 드롭다운 메뉴로 size 선택할 수 있게 설정
      options: ['small', 'medium', 'large', 'biglarge', 'kingbiglarge', 'colorsmall', 'colormedium', 'colorlarge', 'colorbiglarge', 'colorkingbiglarge'], // 옵션 설정
    },
    backgroundColor: {
      description: 'Background color of the button',
      control: 'color',  // 색상 선택 방식으로 control 설정
    },

    
  },
};

export default meta;

type Story = StoryObj<typeof CustomButton>;

// 기본 스토리
export const Default: Story = {
  args: {
    label: 'Click',  // 기본 버튼 텍스트
    size: 'small',   // 기본 사이즈
  },
};
