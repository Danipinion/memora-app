'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, User, UserCheck } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

const navLinks = [
  { href: '/dashboard', icon: Home, label: 'Beranda' },
  { href: '/invitations', icon: UserCheck, label: 'Undangan' },
  { href: '/profile', icon: User, label: 'Profil' },
];

export function MenuBar() {
  const pathname = usePathname();

  return (
    <Card>
      <CardContent className="bg-white w-full h-16 border-t z-10">
        <div className="flex justify-around items-center h-16 max-w-lg mx-auto">
          {navLinks.map((link) => {
            const isActive = pathname.startsWith(link.href);
            const IconComponent = link.icon;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex flex-col items-center justify-center w-20 space-y-1 transition-colors duration-200 
                         ${isActive ? 'text-purple' : 'text-slate-400 hover:text-slate-600'}`}
              >
                <IconComponent className="h-5 w-5" />
                <span className="text-xs font-medium">{link.label}</span>
              </Link>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}