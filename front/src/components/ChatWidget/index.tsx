import React, { useEffect, useState } from 'react';
import Icon from '@ant-design/icons';
import { Button } from 'antd';
import { ReactComponent as chatSvg } from '../../assets/images/chat.svg';
import './styles.css';
interface Props {}

const ChatWidget = (props: Props) => {
  const [visible, setVisible] = useState<boolean>(true);


  useEffect(() => {
    let isMounted = true;

    return () => {
      isMounted = false;
    };
  }, [setVisible]);

  if (visible) return <div className="widgetContainer">
  </div>;
  else
    return (
      <div
        style={{
          position: 'fixed',
          bottom: 20,
          right: 20,
        }}
      >
        <Button
          type="primary"
          shape="round"
          icon={<Icon component={chatSvg} style={{ fontSize: '250%', color: '#010101' }} />}
          style={{ borderRadius: 100, width: 60, height: 60, alignItems: 'center', justifyContent: 'center', backgroundColor: '#4950fe' }}
        />
      </div>
    );
};

export default ChatWidget;
