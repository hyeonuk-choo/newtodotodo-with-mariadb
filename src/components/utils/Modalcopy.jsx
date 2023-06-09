import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Modal = ({
  className,
  onClose,
  maskClosable,
  closable,
  visible,
  children,
  width,
  height,
  radius,
  backgroundcolor,
  top,
}) => {
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  const close = (e) => {
    if (onClose) {
      onClose(e);
    }
  };
  return (
    <>
      {/* <ModalOverlay visible={visible} backgroundcolor={backgroundcolor} /> */}
      <ModalWrapper
        className={className}
        onClick={maskClosable ? onMaskClick : null}
        tabIndex="-1"
        visible={visible}
      >
        <ModalInner
          tabIndex="0"
          className="modal-inner"
          width={width}
          height={height}
          radius={radius}
          top={top}
        >
          {closable}
          {children}
        </ModalInner>
      </ModalWrapper>
    </>
  );
};

Modal.propTypes = {
  visible: PropTypes.bool,
};

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: ${(props) => props.backgroundcolor};
  //background-color: rgba(0, 0, 0, 0.2);
  z-index: 999;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: ${(props) => props.radius};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  max-width: 480px;
  top: ${(props) => props.top};
  transform: translateY(-50%);
  margin: 0 auto;

  .swiper-pagination-horizontal {
  }
  .swiper-pagination-bullet {
  }
  .swiper-pagination-bullet-active {
    color: #fff;
    background: #ff8f27;
  }
`;

export default Modal;
