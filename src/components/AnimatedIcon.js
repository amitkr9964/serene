import React from 'react';
import {
  Calendar,
  Clock,
  Lock,
  AlertTriangle,
  CheckCircle,
  Sun,
  Moon,
  Flag,
  BookOpen,
  Users,
  MessageCircle,
  Shield,
  Heart,
  Star,
  TrendingUp,
  Activity,
  Settings,
  Bell,
  FileText,
  BarChart3,
  Zap,
  Home,
  Send,
  Mic,
  Paperclip,
  Frown,
  Meh,
  Smile,
  Laugh,
  Wind,
  Leaf,
  Phone,
  Mail,
  Target,
  Trophy,
  Edit,
  Eye,
  ThumbsUp,
  Trash2,
  Info,
  CheckCircle2,
  ArrowUp,
  ArrowDown,
  ArrowRight,
  Monitor,
  Smartphone,
  Video,
  Megaphone,
  Clock3,
  UserCheck,
  HandHeart,
  Book,
  Wrench,
  Menu,
  LogOut,
  User,
//   Dove
} from 'lucide-react';

const IconMap = {
  // Calendar and Time
  calendar: Calendar,
  clock: Clock,
  
  // Security and Privacy
  lock: Lock,
  shield: Shield,
  
  // Status and Alerts
  alert: AlertTriangle,
  check: CheckCircle,
  warning: AlertTriangle,
  success: CheckCircle,
  
  // Theme
  sun: Sun,
  moon: Moon,
  
  // Countries/Flags
  flag: Flag,
  
  // General
  book: BookOpen,
  'book-open': BookOpen,
  users: Users,
  message: MessageCircle,
  'message-circle': MessageCircle,
  heart: Heart,
  star: Star,
  trending: TrendingUp,
  activity: Activity,
  settings: Settings,
  wrench: Wrench,
  bell: Bell,
  file: FileText,
  chart: BarChart3,
  zap: Zap,
  
  // Navigation and Actions
  home: Home,
  menu: Menu,
  'log-out': LogOut,
  logout: LogOut,
  send: Send,
  mic: Mic,
  paperclip: Paperclip,
  
  // Emotions
  frown: Frown,
  meh: Meh,
  smile: Smile,
  laugh: Laugh,
  
  // Nature and Elements
  wind: Wind,
  leaf: Leaf,
  
  // Communication
  phone: Phone,
  mail: Mail,
  
  // Goals and Achievement
  target: Target,
  trophy: Trophy,
  
  // Actions
  edit: Edit,
  eye: Eye,
  'thumbs-up': ThumbsUp,
  trash: Trash2,
  info: Info,
  'check-circle': CheckCircle2,
  
  // Arrows
  'arrow-up': ArrowUp,
  'arrow-down': ArrowDown,
  'arrow-right': ArrowRight,
  
  // Technology
  monitor: Monitor,
  smartphone: Smartphone,
  video: Video,
  megaphone: Megaphone,
  
  // Time and Status
  'clock-3': Clock3,
  'user-check': UserCheck,
  user: User,
  
  // Wellness
  'hand-heart': HandHeart,
//   dove: Dove
};

const AnimatedIcon = ({ 
  name, // Support both 'name' and 'type' for backwards compatibility
  type, 
  size = 20, 
  className = '', 
  animate = true, 
  color = 'currentColor',
  onClick,
  style = {}
}) => {
  const iconKey = name || type; // Use 'name' if provided, fallback to 'type'
  const IconComponent = IconMap[iconKey] || Calendar;
  
  const animationStyle = animate ? {
    transition: 'all 0.3s ease',
    cursor: onClick ? 'pointer' : 'default',
    ...style
  } : style;
  
  const hoverClass = animate ? 'hover:scale-110 hover:rotate-3' : '';
  
  return (
    <IconComponent
      size={size}
      color={color}
      className={`${className} ${hoverClass} transition-all duration-300`}
      style={animationStyle}
      onClick={onClick}
    />
  );
};

export default AnimatedIcon;
