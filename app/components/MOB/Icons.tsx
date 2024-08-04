import React from 'react';

export default function Icons(): React.ReactNode {
  return (
    <>
    </>
  );
}

interface WarningProps {
  className?: string | undefined;
  type: string | undefined;
}
// TODO: Framer Motion
export function Warning({ className, type }: WarningProps) {
  switch (type) {
    case '2nd' :{
      return (
        <svg
          className={`h-6 w-6 -translate-y-[3px] ${className}`}
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
          <path d="M12 9v4" />
          <path d="M12 17h.01" />
        </svg>
      );
    }
    default: {
      return (
        <div className='h-12 w-12 -translate-y-[0.11rem] -translate-x-[0.13rem]'>
          <svg 
            className={`fill-[#433D8B] stroke-[#62438C] animate-[revolver_1s_ease-in-out_infinite] ${className}`}
            xmlns="http://www.w3.org/2000/svg" 
            shape-rendering="geometricPrecision" 
            text-rendering="geometricPrecision" 
            image-rendering="optimizeQuality" 
            fill-rule="evenodd" 
            clip-rule="evenodd" 
            viewBox="0 0 512 512"
            strokeWidth='4'
            strokeLinecap='round'
            strokeLinejoin='round'
          >
            <path d="M501.558 245.558c5.766 0 10.442 4.676 10.442 10.443 0 5.767-4.676 10.442-10.442 10.442H313.113c-2.152 11.845-7.897 22.437-16.066 30.605-8.168 8.17-18.761 13.914-30.605 16.066v188.444c0 5.766-4.676 10.442-10.443 10.442-5.767 0-10.442-4.676-10.442-10.442V313.114c-11.845-2.152-22.437-7.896-30.605-16.066-8.17-8.168-13.914-18.76-16.066-30.605H10.442C4.676 266.443 0 261.768 0 256.001s4.676-10.443 10.442-10.443h188.444c2.152-11.844 7.896-22.437 16.066-30.605 8.168-8.169 18.76-13.914 30.605-16.066V10.442C245.557 4.676 250.232 0 255.999 0s10.443 4.676 10.443 10.442v188.445c11.844 2.152 22.437 7.897 30.605 16.066 8.169 8.168 13.914 18.761 16.066 30.605h188.445zM283.148 49.657c46.608 6.073 88.373 27.565 120 59.195 31.63 31.627 53.122 73.392 59.195 120h-21.085c-5.931-40.835-25.04-77.399-52.876-105.234-27.835-27.836-64.399-46.945-105.234-52.876V49.657zM462.343 283.15c-6.073 46.608-27.565 88.372-59.195 120-31.627 31.629-73.392 53.121-120 59.194V441.26c40.835-5.931 77.399-25.04 105.234-52.876 27.836-27.835 46.945-64.399 52.876-105.234h21.085zM228.85 462.344c-46.608-6.073-88.372-27.565-120-59.194-31.629-31.628-53.121-73.392-59.194-120H70.74c5.931 40.835 25.04 77.399 52.876 105.234 27.835 27.836 64.399 46.945 105.234 52.876v21.084zM49.656 228.852c6.073-46.608 27.565-88.373 59.194-120 31.628-31.63 73.392-53.122 120-59.195v21.085c-40.835 5.931-77.399 25.04-105.234 52.876-27.836 27.835-46.945 64.399-52.876 105.234H49.656zm233.492-104.453c26.206 5.379 49.631 18.388 67.849 36.604 18.216 18.218 31.225 41.643 36.604 67.849h-21.41c-5.015-20.428-15.562-38.682-29.961-53.082-14.4-14.399-32.654-24.946-53.082-29.961v-21.41zM387.601 283.15c-5.379 26.205-18.388 49.631-36.604 67.848-18.218 18.216-41.643 31.226-67.849 36.604v-21.409c20.428-5.016 38.682-15.562 53.082-29.961 14.399-14.401 24.946-32.654 29.961-53.082h21.41zM228.85 387.602c-26.205-5.378-49.631-18.388-67.848-36.604-18.216-18.217-31.226-41.643-36.604-67.848h21.409c5.016 20.428 15.562 38.681 29.961 53.082 14.401 14.399 32.654 24.945 53.082 29.961v21.409zm-104.452-158.75c5.378-26.206 18.388-49.631 36.604-67.849 18.217-18.216 41.643-31.225 67.848-36.604v21.41c-20.428 5.015-38.681 15.562-53.082 29.961-14.399 14.4-24.945 32.654-29.961 53.082h-21.409zm131.601-14.196c22.835 0 41.345 18.51 41.345 41.345 0 22.835-18.51 41.344-41.345 41.344-22.835 0-41.344-18.509-41.344-41.344s18.509-41.345 41.344-41.345z"/>
          </svg>
        </div>)
    }
  }
}
