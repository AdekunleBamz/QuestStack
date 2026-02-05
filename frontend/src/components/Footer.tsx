/**
 * Footer Component
 * Site-wide footer with links and branding
 */

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-brand">
            <span className="footer-logo">QuestStack 🎯</span>
            <p className="footer-tagline">Decentralized Quest &amp; Reward Platform</p>
          </div>
          
          <div className="footer-links">
            <div className="footer-section">
              <h4 className="footer-heading">Platform</h4>
              <ul className="footer-list">
                <li><a href="#quests">Quests</a></li>
                <li><a href="#staking">Staking</a></li>
                <li><a href="#governance">Governance</a></li>
              </ul>
            </div>
            
            <div className="footer-section">
              <h4 className="footer-heading">Resources</h4>
              <ul className="footer-list">
                <li><a href="#docs">Documentation</a></li>
                <li><a href="#faq">FAQ</a></li>
                <li><a href="#support">Support</a></li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p className="footer-copyright">
            © {currentYear} QuestStack. Built on Stacks.
          </p>
        </div>
      </div>
    </footer>
  );
}
