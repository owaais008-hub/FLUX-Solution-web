import { Calendar, MapPin, Users, Clock, ArrowRight } from 'lucide-react';
import { Event } from '../lib/supabase';

interface EventCardProps {
  event: Event;
  onRegister: (event: Event) => void;
}

export default function EventCard({ event, onRegister }: EventCardProps) {
  const eventDate = new Date(event.event_date);
  const registrationDeadline = new Date(event.registration_deadline);
  const spotsLeft = event.max_participants - event.current_participants;
  const isAlmostFull = spotsLeft <= event.max_participants * 0.2;

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="group bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden border border-gray-100 hover:scale-105">
      <div className="relative h-48 overflow-hidden">
        <img
          src={event.image_url}
          alt={event.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-gray-700">
          {event.categories?.name}
        </div>
        {isAlmostFull && (
          <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-semibold animate-pulse">
            Almost Full!
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">
          {event.title}
        </h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">{event.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center text-sm text-gray-600">
            <Calendar className="w-4 h-4 mr-2 text-blue-600" />
            <span className="font-medium">{formatDate(eventDate)}</span>
            <span className="mx-2">•</span>
            <Clock className="w-4 h-4 mr-1 text-blue-600" />
            <span>{formatTime(eventDate)}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <MapPin className="w-4 h-4 mr-2 text-blue-600" />
            <span>{event.venue}</span>
          </div>
          <div className="flex items-center text-sm text-gray-600">
            <Users className="w-4 h-4 mr-2 text-blue-600" />
            <span>
              {event.current_participants} / {event.max_participants} registered
            </span>
            <span className="ml-auto text-xs text-gray-500">
              {spotsLeft} spots left
            </span>
          </div>
        </div>

        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-3">
            <div>
              <p className="text-xs text-gray-500">Organized by</p>
              <p className="text-sm font-medium text-gray-700">{event.organizer}</p>
            </div>
            <div className="text-right">
              <p className="text-xs text-gray-500">Register by</p>
              <p className="text-sm font-medium text-gray-700">{formatDate(registrationDeadline)}</p>
            </div>
          </div>

          <button
            onClick={() => onRegister(event)}
            disabled={spotsLeft === 0}
            className={`w-full py-3 rounded-xl font-medium transition-all duration-200 flex items-center justify-center space-x-2 ${
              spotsLeft === 0
                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-r from-blue-600 to-cyan-500 text-white hover:shadow-lg hover:scale-105'
            }`}
          >
            <span>{spotsLeft === 0 ? 'Event Full' : 'Register Now'}</span>
            {spotsLeft > 0 && <ArrowRight className="w-4 h-4" />}
          </button>
        </div>
      </div>
    </div>
  );
}
