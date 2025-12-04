import { useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', form)
      localStorage.setItem('token', res.data.token)
      navigate('/dashboard')
    } catch (err) {
      alert(err.response?.data?.msg || 'Registration failed')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-bold text-center mb-8">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <input placeholder="Name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} className="w-full px-4 py-3 border rounded-lg" required />
          <input type="email" placeholder="Email" value={form.email} onChange={e => setForm({...form, email: e.target.value})}  className="w-full px-4 py-3 border rounded-lg" required />
          <input type="password" placeholder="Password" value={form.password} onChange={e => setForm({...form, password: e.target.value})} className="w-full px-4 py-3 border rounded-lg" required />
          <button type="submit" disabled={loading} className="w-full btn-primary">
            {loading ? 'Creating...' : 'Register'}
          </button>
        </form>
        <p className="text-center mt-4">Already have account? <a href="/login" className="text-blue-600">Login</a></p>
      </div>
    </div>
  )
}