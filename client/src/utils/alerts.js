import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'bottom-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
  background: '#1e293b', 
  color: '#ffffff',
  didOpen: (toast) => {
    toast.addEventListener('mouseenter', Swal.stopTimer);
    toast.addEventListener('mouseleave', Swal.resumeTimer);
  }
});

export const successAlert = (title, text) => {
  return Swal.fire({
    icon: 'success',
    title: title,
    text: text,
    background: '#ffffff',
    confirmButtonColor: '#4f46e5', 
    customClass: {
      popup: 'rounded-[1.5rem] shadow-xl',
      confirmButton: 'rounded-xl font-bold px-6 py-3',
    }
  });
};

export const errorAlert = (title, text) => {
  return Swal.fire({
    icon: 'error',
    title: title,
    text: text,
    background: '#ffffff',
    confirmButtonColor: '#ef4444', 
    customClass: {
      popup: 'rounded-[1.5rem] shadow-xl',
      confirmButton: 'rounded-xl font-bold px-6 py-3',
    }
  });
};

export const confirmAlert = (title, text, confirmText = 'Yes, delete it!') => {
  return Swal.fire({
    title: title,
    text: text,
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#ef4444',
    cancelButtonColor: '#94a3b8',
    confirmButtonText: confirmText,
    background: '#ffffff',
    customClass: {
      popup: 'rounded-[1.5rem] shadow-xl',
      confirmButton: 'rounded-xl font-bold px-6 py-3 mr-2',
      cancelButton: 'rounded-xl font-bold px-6 py-3',
    }
  });
};

export const cartToast = (title) => {
  Toast.fire({
    icon: 'success',
    title: title
  });
};
