import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import API from '../api/axios';
import toast from 'react-hot-toast';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post('/auth/login', { email, password });
      login(res.data.user, res.data.token);
      toast.success('Welcome back!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-white">

      {/* Left Side - Form */}
      <div className="w-full md:w-1/2 flex flex-col justify-center px-12 py-16">

        {/* Logo */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-12">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">F</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Flow</span>
          </div>

          <h1 className="text-3xl font-bold text-gray-900 mb-2">Hi, Welcome Back</h1>
          <p className="text-gray-400 text-sm">Sign in to manage your work and clients</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5 max-w-sm">

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
            <div className="relative">
              <FiMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="email address"
                required
                className="w-full pl-9 pr-4 py-3 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-sm font-medium text-gray-700">Password</label>
              <span className="text-xs text-blue-600 cursor-pointer hover:underline">Forgot password</span>
            </div>
            <div className="relative">
              <FiLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm" />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="your password"
                required
                className="w-full pl-9 pr-10 py-3 border border-gray-200 rounded-lg text-sm text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <FiEyeOff size={14} /> : <FiEye size={14} />}
              </button>
            </div>
          </div>

          {/* Remember me */}
          <div className="flex items-center gap-2">
            <input type="checkbox" id="remember" className="w-4 h-4 rounded border-gray-300 text-blue-600" />
            <label htmlFor="remember" className="text-sm text-gray-600">Remember me</label>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg text-sm transition duration-200 disabled:opacity-50"
          >
            {loading ? 'Signing in...' : 'Login'}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200"></div>
            <span className="text-xs text-gray-400">Or log in with</span>
            <div className="flex-1 h-px bg-gray-200"></div>
          </div>

          {/* Google Button */}
          <button
            type="button"
            className="w-full py-3 border border-gray-200 rounded-lg text-sm text-gray-700 font-medium flex items-center justify-center gap-2 hover:bg-gray-50 transition"
          >
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path fill="rgb(224, 168, 230)" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Google
          </button>

        </form>

        <p className="text-sm text-gray-500 mt-6">
          Don't have an account?{' '}
          <Link to="/register" className="text-blue-600 hover:underline font-medium">Sign Up</Link>
        </p>

      </div>

      {/* Right Side - Visual */}
<div 
  className="hidden md:flex w-425 flex-col items-center justify-center p-20 relative overflow-hidden"
  style={{ background: 'linear-gradient(200deg, #e0e9ff, #fef0f9)' }}
>
 
  {/* Background circles */}
  <div className="absolute top-10 right-10 w-40 h-40 bg-blue-200 rounded-full opacity-30"></div>
  <div className="absolute bottom-31 left-15 w-24 h-24 bg-indigo-300 rounded-full opacity-20"></div>



  {/* slogan text */}
<div className="absolute top-20 left-85 z-10">
  <h2 className="text-2xl font-bold text-gray-00 leading-tight ">
   Your clients. Your projects.<br></br>
   Your money. 
  <span className="text-blue-600"> All here.</span>
  </h2>
</div>

{/* Your actual app screenshot */}
<div className="relative z-10 w-lg mt-8">
  
  {/* Main image - dashboard */}
  <div className="absolute -top-55 -left-40 w-150 shadow-xl rounded-xl overflow-hidden border-2 border-white">
    <img
      src="/images/dashboard-preview.png"
      alt="Flow Dashboard"
      className="rounded-2xl shadow-2xl w-full"
    />
    <div 
      className="absolute bottom-0 left-0 right-20 h-20 rounded-b-2xl"
      style={{ background: 'linear-gradient(to top, #ffffff, transparent)' }}
    ></div>
  </div>

  {/* Second image - clients */}
  <div className="absolute -bottom-60 -right-55 w-100 shadow-xl rounded-xl overflow-hidden border-2 border-white">
    <img
      src="/images/clients-preview.png"
      alt="Flow Clients"
      className="w-full"
    />
    <div 
      className="absolute bottom-0 left-0 right-0 h-50 rounded-b-2xl"
      style={{ background: 'linear-gradient(to top, #ffffff, transparent)' }}
    ></div>
  </div>

  {/* Third image - projects */}
  <div className="absolute -bottom-75 -left-5 w-100 shadow-xl rounded-xl overflow-hidden border-2 border-white">
    <img
      src="/images/projects-preview.png"
      alt="Flow Projects"
      className="w-full"
    />
    <div 
      className="absolute bottom-0 left-0 right-0 h-25 rounded-b-2xl"
      style={{ background: 'linear-gradient(to top, #ffffff, transparent)' }}
    ></div>
  </div>

</div>


</div>

    </div>
  );
};

export default Login;