import { Component } from '@angular/core';

@Component({
  selector: 'app-privacy-policy',
  standalone: true,
  template: `
    <h2>Privacybeleid</h2>
    <ol>
      <li>
        <strong>Inleiding</strong>
        <p>Wij hechten veel waarde aan uw privacy en streven ernaar uw persoonsgegevens te beschermen en verantwoord te verwerken. Dit privacybeleid legt uit welke gegevens wij verzamelen, waarom we dat doen, en hoe we uw gegevens beschermen.</p>
      </li>
      <li>
        <strong>Gegevens die wij verzamelen</strong>
        <ul>
          <li>Persoonlijke identificatiegegevens zoals naam, e-mailadres, en geboortedatum.</li>
          <li>Accountinformatie zoals gebruikersnaam en wachtwoord.</li>
          <li>Gebruiksgedrag op onze website en diensten.</li>
        </ul>
      </li>
      <li>
        <strong>Gebruik van gegevens</strong>
        <p>Uw gegevens worden gebruikt om onze diensten te leveren, uw account te beheren, en u te informeren over updates en aanbiedingen.</p>
      </li>
      <li>
        <strong>Delen van gegevens</strong>
        <p>Wij delen uw gegevens nooit met derden zonder uw toestemming, tenzij dit wettelijk verplicht is.</p>
      </li>
      <li>
        <strong>Beveiliging</strong>
        <p>Wij nemen passende technische en organisatorische maatregelen om uw persoonsgegevens te beveiligen tegen verlies, misbruik en ongeautoriseerde toegang.</p>
      </li>
      <li>
        <strong>Uw rechten</strong>
        <p>U heeft het recht om uw persoonsgegevens in te zien, te corrigeren, te verwijderen, en bezwaar te maken tegen verwerking.</p>
      </li>
      <li>
        <strong>Contact</strong>
        <p>Voor vragen over dit privacybeleid kunt u contact opnemen via privacy&#64;webwizardz.nl</p>
      </li>
    </ol>
    <p>Door gebruik te maken van onze diensten gaat u akkoord met dit privacybeleid.</p>
  `,
  styles: [`
    h2 {
      margin-bottom: 16px;
    }
    ol {
      padding-left: 20px;
    }
    li {
      margin-bottom: 12px;
    }
    ul {
      padding-left: 20px;
    }
  `]
})
export class PrivacyPolicyComponent {}
