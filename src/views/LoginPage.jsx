import logo from '../assets/images/logo-no-background.png';
import { FaRegUser } from "react-icons/fa6";
import { HiOutlineLockClosed as PassIcon, HiOutlineUser as UserIcon } from "react-icons/hi";



export default function () {
    return (
        <div className="form-container flex items-center justify-center h-full">

            <form className="register flex flex-col text-gray-400 w-2/5 gap-4">
                <div className="uppercase text-2xl font-semibold text-center mb-3">

                    <img src={logo} alt="logo" />

                </div>

                <div className="input bg-input flex gap-3 items-center ps-4 rounded-md py-3 pe-3">
                    <UserIcon
                        className='text-xl'
                    />
                    <input type="text"
                        className="bg-transparent w-full  border-transparent focus:border-transparent focus:ring-0"
                        placeholder="Your Username" />
                </div>
                <div className="error-message text-red-500">
                    { }
                </div>
                <div className="input bg-input flex gap-3 items-center ps-4 rounded-md py-3 pe-3">
                    <PassIcon
                        className='text-xl'
                    />
                    <input type="password"
                        className="bg-transparent w-full border-transparent focus:border-transparent focus:ring-0"
                        placeholder="Your Password" v-model="loginData.password" />
                </div>
                <div className="error-message text-red-500">
                    { }
                </div>
                <div className="error-message text-red-500">
                    { }
                </div>
                <div className="success-message text-green-500">
                    { }
                </div>

                <button
                    className="bg-theme hover:bg-theme-dark text-input text-lg font-bold py-2 px-4 rounded-xl transition duration-300 mt-3"
                >
                    Log In
                </button >
                <button
                    className="bg-input hover:bg-gray-900 text-gray-400 border-0 border-gray-400 text-lg font-bold py-2 px-4 rounded-xl transition duration-300"
                >
                    Forgot your password ?
                </button >
                <p className="font-bold text-xl mt-3 cursor-pointer" >
                    Don't have an account yet?
                </p >
            </form >
        </div>
    )
}