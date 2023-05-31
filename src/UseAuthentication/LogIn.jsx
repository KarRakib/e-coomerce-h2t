import React from 'react';
import { useContext } from 'react';
import { UserContext } from '../Context/AuthContext';
import { useForm } from 'react-hook-form';

const ForgotPassword = () => {
  const { userLogIn } = useContext(UserContext)
  const { register, handleSubmit } = useForm()
  const onSubmit = data => {
    console.log(data);
    userLogIn(data.email, data.password)
      .then(() => {
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  }

  return (
    <div>
      <div className="font-mono bg-gray-400">
        <div className="container mx-auto">
          <div className="flex justify-center items-center h-screen px-6">
            <div className="w-full xl:w-3/4 lg:w-11/12 flex">
              <div
                className="w-full h-auto bg-gray-400 hidden lg:block lg:w-1/2 bg-cover rounded-l-lg"
                style={{ backgroundImage: "url('https://i.ibb.co/K2JDMRp/login.png')" }}
              ></div>
              <div className="w-full lg:w-1/2 bg-white p-5 rounded-lg lg:rounded-l-none">
                <div className="px-8 mb-4 text-center">
                  <h3 className="pt-4 mb-2 text-2xl">Please Log In</h3>
                  <button className='ml-4 mt-4' ><img className='w-8 h-8' src="https://i.ibb.co/tcScHS7/google.png" alt="" srcSet="" /> </button>
                  <button className='w-8 h-8 ml-4 ' > <img className='w-8 h-8' src="https://i.ibb.co/y6v9F0G/facebook.png" alt="" srcSet="" />  </button>
                </div>
                <div className="px-8 pt-6 pb-8 mb-4 bg-white rounded">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-4">
                      <label className="block mb-2 text-sm font-bold text-gray-700" htmlFor="email">
                        Email
                      </label>
                      <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        {...register('email')}
                        type="email"
                        placeholder="Enter Email Address..."
                      />
                      <input
                        className="w-full px-3 py-2 text-sm leading-tight text-gray-700 border rounded shadow appearance-none focus:outline-none focus:shadow-outline"
                        {...register('password')}
                        type="password"
                        placeholder="Enter Password..."
                      />
                    </div>
                    <div className="mb-6 text-center">
                      <button
                        className="w-full px-4 py-2 font-bold text-white bg-red-500 rounded-full hover:bg-red-700 focus:outline-none focus:shadow-outline"
                        type="submit"
                      >
                        Sign In
                      </button>
                    </div>
                  </form>
                  <hr className="mb-6 border-t" />
                  <div className="text-center">
                    <a
                      className="inline-block text-sm text-blue-500 align-baseline hover:text-blue-800"
                      href="./register.html"
                    >
                      Create an Account!
                    </a>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
