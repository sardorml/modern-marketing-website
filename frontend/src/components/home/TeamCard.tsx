import type { TeamMember } from '@/lib/api/team';
import { getStrapiMediaUrl } from '@/lib/api/strapi';
import { WhatsAppIcon, PhoneIcon, EmailIcon } from '@/icons';

interface TeamCardProps {
  member: TeamMember;
}

export default function TeamCard({ member }: TeamCardProps) {
  return (
    <div className="flex flex-col items-center text-center py-4">
      {/* Image with offset frame */}
      <div className="relative mb-6">
        {/* Image container */}
        <div className="relative w-60 h-[180px] bg-brand-brown-100">
          {member.image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={getStrapiMediaUrl(member.image)}
              alt={member.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-brand-brown-500 text-4xl font-bold">
              {member.name.charAt(0)}
            </div>
          )}
        </div>
      </div>

      {/* Info */}
      <h3 className="text-brand-brown-500 font-semibold text-sm mb-1">{member.name}</h3>
      <p className="text-gray-500 text-xs uppercase tracking-wide mb-3">{member.role}</p>

      {/* Contact Icons */}
      <div className="flex items-center gap-3">
        {member.whatsapp && (
          <a
            href={`https://wa.me/${member.whatsapp.replace(/\D/g, '')}`}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand-brown-400 hover:text-brand-brown-500 transition"
            aria-label={`WhatsApp ${member.name}`}
          >
            <WhatsAppIcon className="w-4 h-4" />
          </a>
        )}
        {member.phone && (
          <a
            href={`tel:${member.phone}`}
            className="text-brand-brown-400 hover:text-brand-brown-500 transition"
            aria-label={`Call ${member.name}`}
          >
            <PhoneIcon className="w-4 h-4" />
          </a>
        )}
        {member.email && (
          <a
            href={`mailto:${member.email}`}
            className="text-brand-brown-400 hover:text-brand-brown-500 transition"
            aria-label={`Email ${member.name}`}
          >
            <EmailIcon className="w-4 h-4" />
          </a>
        )}
      </div>
    </div>
  );
}
