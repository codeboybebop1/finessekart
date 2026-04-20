
export function ContactSeller(user, listing){
    const message = `Hi ${listing.Artist?.FullName || ""}, I am ${user?.fullName || "a buyer"} and I’m interested in buying your painting "${listing.Title}" listed for ₹${listing.Price}. Please let me know if it is still available.`;

    const whatsappURL = `https://wa.me/${listing.Artist.PhoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, "_blank", "noopener,noreferrer");
}

