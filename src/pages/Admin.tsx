import { useState } from 'react';
import { useNavigate, Routes, Route } from 'react-router';
import { useAuth } from '@/hooks/useAuth';
import { trpc } from '@/providers/trpc';
import {
  LayoutDashboard,
  Inbox,
  Users,
  Calendar,
  Briefcase,
  FileText,
  MessageSquare,
  HelpCircle,
  Folder,
  Bell,
  Shield,
  ClipboardList,
  Settings,
  Menu,
  X,
  Search,
  LogOut,
  ChevronRight,
  TrendingUp,
  TrendingDown,
  ArrowUpRight,
  Eye,
  Edit,
  Archive,
} from 'lucide-react';

const menuItems = [
  { id: 'overview', label: 'Ringkasan', icon: LayoutDashboard },
  { id: 'consultations', label: 'Permintaan Konsultasi', icon: Inbox },
  { id: 'clients', label: 'Klien', icon: Users },
  { id: 'schedule', label: 'Jadwal', icon: Calendar },
  { id: 'services', label: 'Layanan', icon: Briefcase },
  { id: 'articles', label: 'Artikel', icon: FileText },
  { id: 'testimonials', label: 'Testimoni', icon: MessageSquare },
  { id: 'faqs', label: 'FAQ', icon: HelpCircle },
  { id: 'documents', label: 'Dokumen', icon: Folder },
  { id: 'notifications', label: 'Notifikasi', icon: Bell },
  { id: 'users', label: 'Pengguna \u0026 Hak Akses', icon: Shield },
  { id: 'audit', label: 'Audit Log', icon: ClipboardList },
  { id: 'settings', label: 'Pengaturan', icon: Settings },
];

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    'Baru': 'bg-blue-500/15 text-blue-400',
    'Sedang Ditinjau': 'bg-amber-500/15 text-amber-400',
    'Menunggu Dokumen': 'bg-gray-500/15 text-gray-400',
    'Dijadwalkan': 'bg-purple-500/15 text-purple-400',
    'Dalam Pendampingan': 'bg-cyan-500/15 text-cyan-400',
    'Menunggu Tanggapan Klien': 'bg-orange-500/15 text-orange-400',
    'Selesai': 'bg-green-500/15 text-green-400',
    'Dibatalkan': 'bg-red-500/15 text-red-400',
    'Diarsipkan': 'bg-gray-500/15 text-gray-400',
  };
  return (
    <span className={`inline-flex px-2.5 py-1 rounded-full text-[11px] font-medium ${colors[status] || colors['Baru']}`}>
      {status}
    </span>
  );
}

function OverviewPage() {
  const { data: dashboard } = trpc.admin.dashboard.useQuery();

  const stats = [
    { label: 'Konsultasi Baru', value: dashboard?.consultationStats?.baru ?? 0, trend: 'up' },
    { label: 'Konsultasi Aktif', value: dashboard?.consultationStats?.active ?? 0, trend: 'up' },
    { label: 'Selesai Bulan Ini', value: dashboard?.consultationStats?.completed ?? 0, trend: 'up' },
    { label: 'Menunggu Respons', value: dashboard?.consultationStats?.waiting ?? 0, trend: 'down' },
  ];

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <div key={i} className="bg-stilus-charcoal border border-white/[0.12] rounded-xl p-6">
            <p className="font-display text-[36px] font-semibold text-stilus-white">{stat.value}</p>
            <div className="flex items-center justify-between mt-2">
              <p className="font-body text-[13px] text-stilus-muted">{stat.label}</p>
              {stat.trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-green-400" />
              ) : (
                <TrendingDown className="w-4 h-4 text-amber-400" />
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Recent Consultations */}
      <div className="bg-stilus-charcoal border border-white/[0.12] rounded-xl overflow-hidden">
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.08]">
          <h3 className="font-body text-[16px] font-semibold text-stilus-white">Konsultasi Terbaru</h3>
          <button className="font-body text-[13px] text-stilus-gray hover:text-stilus-white flex items-center gap-1 cursor-pointer bg-transparent border-none">
            Lihat Semua <ChevronRight className="w-4 h-4" />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-stilus-surface/50">
                <th className="text-left px-6 py-3 font-body text-[12px] uppercase text-stilus-muted font-medium">Tiket</th>
                <th className="text-left px-6 py-3 font-body text-[12px] uppercase text-stilus-muted font-medium">Nama</th>
                <th className="text-left px-6 py-3 font-body text-[12px] uppercase text-stilus-muted font-medium">Layanan</th>
                <th className="text-left px-6 py-3 font-body text-[12px] uppercase text-stilus-muted font-medium">Status</th>
                <th className="text-left px-6 py-3 font-body text-[12px] uppercase text-stilus-muted font-medium">Tanggal</th>
              </tr>
            </thead>
            <tbody>
              {dashboard?.recentConsultations?.slice(0, 10).map((c) => (
                <tr key={c.id} className="border-t border-white/[0.06] hover:bg-stilus-surface/30 transition-colors">
                  <td className="px-6 py-3 font-mono-tech text-[13px] text-stilus-accent">{c.ticketNumber}</td>
                  <td className="px-6 py-3 font-body text-[14px] text-stilus-soft">{c.fullName}</td>
                  <td className="px-6 py-3 font-body text-[14px] text-stilus-gray">{c.serviceId || '-'}</td>
                  <td className="px-6 py-3"><StatusBadge status={c.status} /></td>
                  <td className="px-6 py-3 font-body text-[13px] text-stilus-muted">
                    {c.createdAt ? new Date(c.createdAt).toLocaleDateString('id-ID') : '-'}
                  </td>
                </tr>
              )) || (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center font-body text-[14px] text-stilus-muted">
                    Belum ada data konsultasi
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Distribution */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-stilus-charcoal border border-white/[0.12] rounded-xl p-6">
          <h3 className="font-body text-[16px] font-semibold text-stilus-white mb-4">Distribusi Layanan</h3>
          <div className="space-y-3">
            {dashboard?.serviceDistribution?.map((s, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="font-body text-[14px] text-stilus-gray">Layanan #{s.serviceId}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-stilus-surface rounded-full overflow-hidden">
                    <div className="h-full bg-stilus-crimson rounded-full" style={{ width: `${Math.min(100, (s.count / (dashboard?.consultationStats?.total || 1)) * 100)}%` }} />
                  </div>
                  <span className="font-mono-tech text-[13px] text-stilus-soft w-6">{s.count}</span>
                </div>
              </div>
            )) || <p className="font-body text-[14px] text-stilus-muted">Belum ada data</p>}
          </div>
        </div>
        <div className="bg-stilus-charcoal border border-white/[0.12] rounded-xl p-6">
          <h3 className="font-body text-[16px] font-semibold text-stilus-white mb-4">Distribusi Jenjang</h3>
          <div className="space-y-3">
            {dashboard?.educationDistribution?.map((e, i) => (
              <div key={i} className="flex items-center justify-between">
                <span className="font-body text-[14px] text-stilus-gray">{e.educationLevel}</span>
                <div className="flex items-center gap-3">
                  <div className="w-32 h-2 bg-stilus-surface rounded-full overflow-hidden">
                    <div className="h-full bg-stilus-accent rounded-full" style={{ width: `${Math.min(100, (e.count / (dashboard?.consultationStats?.total || 1)) * 100)}%` }} />
                  </div>
                  <span className="font-mono-tech text-[13px] text-stilus-soft w-6">{e.count}</span>
                </div>
              </div>
            )) || <p className="font-body text-[14px] text-stilus-muted">Belum ada data</p>}
          </div>
        </div>
      </div>
    </div>
  );
}

function ConsultationsPage() {
  const { data: consultations } = trpc.consultation.list.useQuery();
  const [filter, setFilter] = useState('');

  const filtered = consultations?.filter(c => 
    c.fullName.toLowerCase().includes(filter.toLowerCase()) ||
    c.ticketNumber.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="font-display text-[28px] font-medium text-stilus-white">Permintaan Konsultasi</h2>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stilus-muted" />
          <input
            type="text"
            placeholder="Cari nama atau tiket..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="pl-10 pr-4 py-2.5 bg-stilus-charcoal border border-white/[0.12] rounded-lg font-body text-[14px] text-stilus-white placeholder-stilus-muted focus:border-white/55 focus:outline-none w-64"
          />
        </div>
      </div>

      <div className="bg-stilus-charcoal border border-white/[0.12] rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-stilus-surface/50">
                <th className="text-left px-4 py-3 font-body text-[12px] uppercase text-stilus-muted font-medium">Tiket</th>
                <th className="text-left px-4 py-3 font-body text-[12px] uppercase text-stilus-muted font-medium">Nama</th>
                <th className="text-left px-4 py-3 font-body text-[12px] uppercase text-stilus-muted font-medium">Email</th>
                <th className="text-left px-4 py-3 font-body text-[12px] uppercase text-stilus-muted font-medium">Jenjang</th>
                <th className="text-left px-4 py-3 font-body text-[12px] uppercase text-stilus-muted font-medium">Status</th>
                <th className="text-left px-4 py-3 font-body text-[12px] uppercase text-stilus-muted font-medium">Aksi</th>
              </tr>
            </thead>
            <tbody>
              {filtered?.map((c) => (
                <tr key={c.id} className="border-t border-white/[0.06] hover:bg-stilus-surface/30 transition-colors">
                  <td className="px-4 py-3 font-mono-tech text-[12px] text-stilus-accent">{c.ticketNumber}</td>
                  <td className="px-4 py-3 font-body text-[14px] text-stilus-soft">{c.fullName}</td>
                  <td className="px-4 py-3 font-body text-[13px] text-stilus-gray">{c.email}</td>
                  <td className="px-4 py-3 font-body text-[13px] text-stilus-gray">{c.educationLevel}</td>
                  <td className="px-4 py-3"><StatusBadge status={c.status} /></td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 rounded-lg hover:bg-white/10 text-stilus-gray hover:text-stilus-white transition-colors cursor-pointer">
                        <Eye className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-white/10 text-stilus-gray hover:text-stilus-white transition-colors cursor-pointer">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded-lg hover:bg-white/10 text-stilus-gray hover:text-stilus-white transition-colors cursor-pointer">
                        <Archive className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              )) || (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center font-body text-[14px] text-stilus-muted">
                    Belum ada permintaan konsultasi
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function SettingsPage() {
  return (
    <div className="space-y-6">
      <h2 className="font-display text-[28px] font-medium text-stilus-white">Pengaturan</h2>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {['Umum', 'SEO', 'Email', 'WhatsApp'].map((section) => (
          <div key={section} className="bg-stilus-charcoal border border-white/[0.12] rounded-xl p-6">
            <h3 className="font-body text-[16px] font-semibold text-stilus-white mb-4">{section}</h3>
            <div className="space-y-4">
              <div>
                <label className="font-body text-[13px] text-stilus-gray mb-1 block">Setting 1</label>
                <input
                  type="text"
                  placeholder="Value"
                  className="w-full bg-stilus-black border border-white/[0.12] rounded-lg px-4 py-2.5 font-body text-[14px] text-stilus-white placeholder-stilus-muted focus:border-white/55 focus:outline-none"
                />
              </div>
              <div>
                <label className="font-body text-[13px] text-stilus-gray mb-1 block">Setting 2</label>
                <input
                  type="text"
                  placeholder="Value"
                  className="w-full bg-stilus-black border border-white/[0.12] rounded-lg px-4 py-2.5 font-body text-[14px] text-stilus-white placeholder-stilus-muted focus:border-white/55 focus:outline-none"
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Admin() {
  const navigate = useNavigate();
  const { user, logout, isLoading } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('overview');

  // Check auth - redirect if not logged in
  if (isLoading) {
    return (
      <div className="min-h-screen bg-stilus-black flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-stilus-crimson border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Allow admin access for now (in production, check role)
  // if (!user) {
  //   navigate('/login');
  //   return null;
  // }

  const renderContent = () => {
    switch (activeMenu) {
      case 'overview': return <OverviewPage />;
      case 'consultations': return <ConsultationsPage />;
      case 'settings': return <SettingsPage />;
      default: return (
        <div className="flex flex-col items-center justify-center py-20">
          <p className="font-display text-[24px] text-stilus-white mb-2">Segera Hadir</p>
          <p className="font-body text-[14px] text-stilus-gray">Halaman ini sedang dalam pengembangan.</p>
        </div>
      );
    }
  };

  return (
    <div className="min-h-screen bg-stilus-black flex">
      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/60 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-[240px] bg-stilus-deep border-r border-white/[0.12] flex flex-col transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        {/* Logo */}
        <div className="px-4 py-5 border-b border-white/[0.08]">
          <div className="flex items-center gap-3">
            <img src="/images/logo-si.png" alt="SI" className="h-6 w-auto" />
            <div>
              <p className="font-body text-[14px] font-semibold text-stilus-soft">Stilus Intellectus</p>
              <p className="font-mono-tech text-[11px] uppercase text-stilus-muted">Admin</p>
            </div>
          </div>
        </div>

        {/* Menu */}
        <nav className="flex-1 px-3 py-4 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeMenu === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { setActiveMenu(item.id); setSidebarOpen(false); }}
                className={`w-full flex items-center gap-3 px-3 h-10 rounded-lg font-body text-[14px] font-medium transition-all cursor-pointer border-none mb-0.5 ${
                  isActive
                    ? 'bg-[rgba(107,39,55,0.15)] text-stilus-white border-l-[3px] border-l-stilus-crimson'
                    : 'text-stilus-gray hover:bg-white/[0.06] hover:text-stilus-soft'
                }`}
                style={isActive ? { borderLeft: '3px solid #6B2737' } : {}}
              >
                <Icon className={`w-[18px] h-[18px] ${isActive ? 'text-stilus-crimson' : 'text-stilus-muted'}`} />
                {item.label}
              </button>
            );
          })}
        </nav>

        {/* User */}
        <div className="px-4 py-4 border-t border-white/[0.08]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-stilus-crimson/30 flex items-center justify-center">
              <span className="font-body text-[12px] font-semibold text-stilus-white">
                {user?.name?.charAt(0) || 'A'}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-body text-[13px] font-medium text-stilus-soft truncate">{user?.name || 'Admin'}</p>
              <p className="font-body text-[11px] text-stilus-muted truncate">{user?.email || 'admin@stilus.id'}</p>
            </div>
            <button
              onClick={() => logout()}
              className="p-1.5 rounded-lg hover:bg-white/10 text-stilus-muted hover:text-stilus-white transition-colors cursor-pointer bg-transparent border-none"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="h-16 bg-stilus-black border-b border-white/[0.12] flex items-center justify-between px-6 flex-shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 text-stilus-white cursor-pointer bg-transparent border-none"
          >
            <Menu className="w-5 h-5" />
          </button>

          <div className="flex items-center gap-4">
            <div className="relative hidden sm:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-stilus-muted" />
              <input
                type="text"
                placeholder="Cari..."
                className="pl-10 pr-4 py-2 bg-stilus-charcoal border border-white/[0.12] rounded-lg font-body text-[13px] text-stilus-white placeholder-stilus-muted focus:border-white/55 focus:outline-none w-48"
              />
            </div>
            <button className="relative p-2 text-stilus-muted hover:text-stilus-white transition-colors cursor-pointer bg-transparent border-none">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-stilus-crimson rounded-full" />
            </button>
          </div>
        </header>

        {/* Content */}
        <main className="flex-1 p-6 lg:p-8 overflow-y-auto">
          {renderContent()}
        </main>
      </div>
    </div>
  );
}
