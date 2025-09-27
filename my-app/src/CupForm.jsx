import "./App.css";

export default function CupForm({ lang, translations }) {
    return (
        <form
           onSubmit={(e) => {
    e.preventDefault();
    const form = e.target;

    const recipient =
        form.type.value === "rent"
            ? "dragondominik0103@gmail.com"
            : "dragondominik0103@gmail.com";

    const subject = `Inquiry from ${form.name.value}`;
    const body = `
Name: ${form.name.value}
Company: ${form.company.value}
Email: ${form.email.value}
Phone: ${form.phone.value}
Type: ${form.type.value}
Message:
${form.message.value}
    `;

    window.location.href = `mailto:${recipient}?subject=${encodeURIComponent(
        subject
    )}&body=${encodeURIComponent(body)}`;
}}

            className="max-w-3xl space-y-4    "
        >

            {/* First row: Name + Company */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                    { id: "name", label: translations.contact.name, must: true },
                    { id: "company", label: translations.contact.company, must: false },
                ].map(({ id, name, label, must }) => (
                    <div key={id} className="relative w-full">
                        <input
                            type="text"
                            maxLength={100}
                            name={id}
                            id={id}
                            required={must} 
                            placeholder=" "
                            className="peer block w-full border-b-2 border-[var(--dark-blue)] bg-transparent pt-2 pb-0.5 sm-text placeholder-transparent focus:border-[var(--dark-blue)] focus:outline-none"
                        />
                        <label
                            htmlFor={id}
                            className="absolute left-0 top-2 text-[var(--dark-blue)] sm-text transition-all duration-300
                peer-placeholder-shown:top-2 peer-placeholder-shown:text-[var(--dark-blue)]
                peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-sm
                peer-focus:-top-2 peer-focus:sm-text peer-focus:text-[var(--mid-blue)]"
                        >
                            {label} {must && <span className="xs-text">*</span>}
                        </label>
                        <span className={`absolute bottom-0 left-0 h-0.5 w-full scale-x-0 transition-transform duration-300 peer-focus:scale-x-100 peer-not-placeholder-shown:scale-x-100 peer-focus:bg-[var(--mid-blue)] peer-not-placeholder-shown:bg-[var(--dark-blue)]`}></span>
                    </div>
                ))}
            </div>

            {/* Second row: Email + Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                    { id: "email", label: translations.contact.email, type: "email", length: 100 },
                    { id: "phone", label: translations.contact.phone, length: 20 },
                ].map(({ id, label, type, length }) => (
                    <div key={id} className="relative w-full">
                        <input
                            type={type || "text"}
                            name={id}
                            id={id}
                            maxLength={length}
                            required
                            placeholder=" "
                            className="peer block w-full border-b-2 border-[var(--dark-blue)] bg-transparent pt-2 pb-0.5 sm-text placeholder-transparent focus:border-[var(--dark-blue)] focus:outline-none"
                            pattern={id === "phone" ? "^\\+?[0-9\\s\\-()]{7,20}$" : undefined}
                        />
                        <label
                            htmlFor={id}
                            className="absolute left-0 top-2 text-[var(--dark-blue)] sm-text transition-all duration-300
          peer-placeholder-shown:top-2 peer-placeholder-shown:text-[var(--dark-blue)]
          peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-sm
          peer-focus:-top-2 peer-focus:sm-text peer-focus:text-[var(--mid-blue)]"
                        >
                            {label} <span className="xs-text">*</span>
                        </label>
                        <span
                            className={`absolute bottom-0 left-0 h-0.5 w-full scale-x-0 transition-transform duration-300 peer-focus:scale-x-100 peer-not-placeholder-shown:scale-x-100 peer-focus:bg-[var(--mid-blue)] peer-not-placeholder-shown:bg-[var(--dark-blue)]`}
                        ></span>
                    </div>
                ))}
            </div>


            {/* Message textarea */}
            <div className="relative w-full mt-4">
                <textarea
                    name="message"
                    id="message"
                    rows={4}
                    required
                    placeholder=" "
                    className="peer block w-full border-b-2 border-[var(--dark-blue)] bg-transparent pt-2 pb-0.5 sm-text placeholder-transparent focus:border-[var(--dark-blue)] focus:outline-none"
                ></textarea>
                <label
                    htmlFor="message"
                    className="absolute left-0 top-2 text-[var(--dark-blue)] sm-text transition-all duration-300
            peer-placeholder-shown:top-2 peer-placeholder-shown:text-[var(--dark-blue)]
            peer-not-placeholder-shown:-top-2 peer-not-placeholder-shown:text-sm
            peer-focus:-top-2 peer-focus:sm-text peer-focus:text-[var(--mid-blue)]"
                >
                    {translations.contact.message} <span className="xs-text">*</span>
                </label>
                <span className={`absolute bottom-0 left-0 h-0.5 w-full scale-x-0 transition-transform duration-300 peer-focus:scale-x-100 peer-not-placeholder-shown:scale-x-100 peer-focus:bg-[var(--mid-blue)] peer-not-placeholder-shown:bg-[var(--dark-blue)]`}></span>
            </div>

            {/* Type select */}
            <div className="relative w-full mt-4">
                <label htmlFor="type" className="block text-[var(--dark-blue)] mb-1 font-medium">
                    {translations.contact.reason} <span className="xs-text">*</span>
                </label>
                <select
                    name="type"
                    id="type"
                    defaultValue="rent"
                    className="w-full border-b-2 border-[var(--dark-blue)] pt-2 pb-0.5 sm-text focus:border-[var(--dark-blue)] focus:outline-none bg-transparent"
                >
                    <option value="sales">{translations.contact.consales}</option>
                    <option value="factory">{translations.contact.confactory}</option>
                    <option value="other">{translations.contact.other}</option>
                </select>
            </div>
            <div className="w-full grid grid-cols-3 items-stretch">
                {/* Vonal bal */}
                <div className="flex justify-start items-center pr-2">
                    <span className="h-[var(--border-radius-16)] w-full bg-[var(--dark-blue)] rounded-[var(--border-radius-16)] shadow-custom-box"></span>
                </div>


                {/* Column 2: button matches height of tallest column */}
                <div className="flex justify-center items-stretch">
               <button
    type="submit"
    className="w-full bg-[var(--dark-blue)] text-[var(--light-blue)] py-2 rounded-[var(--border-radius-16)] transition transform hover:bg-[var(--mid-blue)] hover:text-[var(--dark-blue)] hover:scale-105 active:scale-95"
>
    {translations.contact.send}
</button>

                </div>

                {/* Vonal jobb */}
                <div className="flex justify-start items-center pl-2">
                    <span className="h-[var(--border-radius-16)] w-full bg-[var(--dark-blue)] rounded-[var(--border-radius-16)] shadow-custom-box"></span>
                </div>
            </div>


        </form>
    );
}
