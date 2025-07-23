import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useAuth } from '@/hooks/use-auth';
import { useToast } from '@/hooks/use-toast';
import { LogOut, Shield, Users, Mail, Database } from 'lucide-react';

export function AdminPanel() {
  const { logout, user } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await logout();
      toast({
        title: "Success",
        description: "Successfully logged out",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Logout failed",
        variant: "destructive",
      });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed top-4 right-4 z-50"
    >
      <Card className="bg-black/95 backdrop-blur-xl border border-gray-800/50 min-w-[280px]">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-lg">
            <Shield className="w-5 h-5 text-green-400" />
            <span className="bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
              Admin Panel
            </span>
          </CardTitle>
          <p className="text-sm text-gray-400">Welcome back, {user?.username}</p>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-2 text-gray-300">
              <Users className="w-3 h-3" />
              <span>Users</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Mail className="w-3 h-3" />
              <span>Messages</span>
            </div>
            <div className="flex items-center gap-2 text-gray-300">
              <Database className="w-3 h-3" />
              <span>Database</span>
            </div>
            <div className="flex items-center gap-2 text-green-400">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Online</span>
            </div>
          </div>
          
          <Button
            onClick={handleLogout}
            variant="outline"
            size="sm"
            className="w-full bg-gray-900/50 border-gray-700 text-gray-300 hover:bg-red-900/30 hover:border-red-700 hover:text-red-300 transition-all duration-200"
          >
            <LogOut className="w-4 h-4 mr-2" />
            Sign Out
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}