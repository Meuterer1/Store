import { toast, TypeOptions } from 'react-toastify';

const useMessage = () => {
  const showMessage = (type: TypeOptions, message: string) => {
    toast(message, {
      position: 'bottom-right',
      autoClose: 2000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark',
      type: type,
    });
  };
  return showMessage;
};

export default useMessage;
