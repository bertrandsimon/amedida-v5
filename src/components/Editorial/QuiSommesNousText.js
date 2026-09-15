export default function QuiSommesNousText({
  className = "",
  strongClassName = "font-bold not-italic text-[color:var(--dest-text)]",
}) {
  return (
    <div className={`space-y-2 leading-relaxed ${className}`}>
      <p>
        <strong className={strongClassName}>
          Notre métier ? Créer le « waouh ».
        </strong>
      </p>
      <p>Pas de copier-coller.</p>
      <p>Pas de programme vu et revu.</p>
      <p>Pas de voyage qui ressemble à un autre.</p>
      <p>
        <strong className={strongClassName}>Une destination qui surprend.</strong>
      </p>
      <p>
        <strong className={strongClassName}>
          Une adresse qu&apos;on n&apos;aurait pas trouvée seul.
        </strong>
      </p>
      <p>
        <strong className={strongClassName}>
          Une expérience qui rassemble et crée des souvenirs.
        </strong>
      </p>
      <p>
        Parce qu&apos;au fond, nous ne sommes pas là simplement pour organiser
        des événements.
      </p>
      <p>
        <strong className={strongClassName}>
          Nous sommes là pour créer des moments qui marquent.
        </strong>
      </p>
      <p>Votre événement.</p>
      <p>Votre équipe.</p>
      <p>Votre histoire.</p>
      <p>
        <strong className={strongClassName}>
          Forcément, votre voyage doit être unique.
        </strong>
      </p>
    </div>
  );
}
