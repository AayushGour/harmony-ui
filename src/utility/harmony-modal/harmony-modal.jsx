import { Modal } from 'antd';
import React from 'react';

const HarmonyModal = (props) => {
    const { isOpen, children, onOk, onCancel } = props;
    return (
        <Modal open={isOpen} onOk={onOk} onCancel={onCancel}>
            {children}
        </Modal>
    )
}

export default HarmonyModal;