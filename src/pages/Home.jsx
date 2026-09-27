import { Link } from 'react-router-dom';
import { themes } from '../themes';
import Button from '../components/ui/Button';
import HeartParticles from '../components/effects/HeartParticles';

/**
 * Home page - Landing page for LoveDrop
 */
export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 glass">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl">💌</span>
            <span className="text-xl font-display font-bold text-gradient">
              LoveDrop
            </span>
          </Link>
          <div className="flex items-center gap-3">
            <Link
              to="/gallery"
              className="text-sm text-gray-600 hover:text-primary-500 transition-colors hidden md:block"
            >
              Gallery
            </Link>
            <Link to="/create">
              <Button size="sm">Create a Letter</Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
        {/* Background particles */}
        <HeartParticles theme="romantic" count={25} active={true} />

        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-b from-primary-50 via-white to-pink-50 -z-10" />

        <div className="container mx-auto px-4 text-center relative z-20">
          <div className="max-w-3xl mx-auto">
            {/* Badge */}
            <div className="inline-block px-4 py-1.5 bg-primary-100 text-primary-700 rounded-full text-sm font-medium mb-6 animate-fade-in">
              ✨ Free • No Sign-up Needed
            </div>

            {/* Heading */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-gray-900 mb-6 animate-slide-up">
              Send a <span className="text-gradient">Beautiful Letter</span>
              <br />
              to Someone Special
            </h1>

            {/* Subtitle */}
            <p className="text-lg md:text-xl text-gray-500 mb-8 max-w-2xl mx-auto animate-slide-up" style={{ animationDelay: '0.1s' }}>
              Create stunning virtual letters with animations, effects, and music.
              Perfect for long-distance relationships, birthdays, and best friendships.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <Link to="/create">
                <Button size="lg" fullWidth className="sm:w-auto">
                  💌 Create Your Letter
                </Button>
              </Link>
              <Link to="/gallery">
                <Button variant="secondary" size="lg" fullWidth className="sm:w-auto">
                  ✨ View Examples
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="flex justify-center gap-8 mt-12 animate-fade-in" style={{ animationDelay: '0.4s' }}>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary-500">3</p>
                <p className="text-sm text-gray-500">Themes</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary-500">10+</p>
                <p className="text-sm text-gray-500">Effects</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-primary-500">∞</p>
                <p className="text-sm text-gray-500">Love</p>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce text-gray-400">
          <span className="text-2xl">↓</span>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
            How It <span className="text-gradient">Works</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              {
                step: '1',
                emoji: '🎨',
                title: 'Choose a Theme',
                desc: 'Pick Romantic, Birthday, or Friendship theme with matching effects',
              },
              {
                step: '2',
                emoji: '✍️',
                title: 'Write Your Letter',
                desc: 'Add your message, decorations, and personalize it your way',
              },
              {
                step: '3',
                emoji: '🔗',
                title: 'Share the Link',
                desc: 'Get a unique link and send it to your loved one instantly',
              },
            ].map((item) => (
              <div key={item.step} className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-all duration-300">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-primary-100 flex items-center justify-center text-3xl">
                  {item.emoji}
                </div>
                <div className="text-xs font-bold text-primary-500 mb-2">STEP {item.step}</div>
                <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Themes Preview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-4">
            Choose Your <span className="text-gradient">Occasion</span>
          </h2>
          <p className="text-center text-gray-500 mb-12 max-w-xl mx-auto">
            Each theme comes with its own unique animations, effects, and sound
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {Object.values(themes).map((theme) => (
              <Link key={theme.id} to={`/create?theme=${theme.id}`}>
                <div className={`${theme.className} rounded-3xl p-8 text-center hover:shadow-xl hover:-translate-y-2 transition-all duration-300 cursor-pointer h-full`}>
                  <span className="text-6xl block mb-4">{theme.emoji}</span>
                  <h3 className="text-2xl font-display font-bold mb-2" style={{ color: theme.colors.text }}>
                    {theme.name}
                  </h3>
                  <p className="text-sm opacity-75 mb-4" style={{ color: theme.colors.text }}>
                    {theme.description}
                  </p>
                  <div className="flex flex-wrap gap-1.5 justify-center">
                    {theme.effects.map((effect) => (
                      <span
                        key={effect}
                        className="text-xs px-2 py-1 rounded-full bg-white/50 backdrop-blur-sm"
                        style={{ color: theme.colors.text }}
                      >
                        {effect}
                      </span>
                    ))}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-center mb-12">
            Everything You <span className="text-gradient">Need</span>
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { emoji: '✉️', label: 'Envelope Animation' },
              { emoji: '🎉', label: 'Confetti Effects' },
              { emoji: '❤️', label: 'Heart Particles' },
              { emoji: '🃏', label: 'Flip Cards' },
              { emoji: '🎁', label: 'Scratch Cards' },
              { emoji: '🎮', label: 'Mini Games' },
              { emoji: '🎵', label: 'Sound & Music' },
              { emoji: '👥', label: 'Group Cards' },
            ].map((feature) => (
              <div
                key={feature.label}
                className="text-center p-4 rounded-2xl border border-gray-100 hover:border-primary-200 hover:bg-primary-50/50 transition-all duration-300"
              >
                <span className="text-3xl block mb-2">{feature.emoji}</span>
                <p className="text-sm font-medium text-gray-700">{feature.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary-500 to-primary-700 relative overflow-hidden">
        <HeartParticles theme="romantic" count={15} active={true} />
        <div className="container mx-auto px-4 text-center relative z-20">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-white mb-4">
            Ready to Make Someone's Day? 💕
          </h2>
          <p className="text-white/80 mb-8 max-w-lg mx-auto">
            Create a beautiful virtual letter in under 2 minutes. No sign-up, no cost, just love.
          </p>
          <Link to="/create">
            <button className="px-8 py-4 bg-white text-primary-600 font-bold text-lg rounded-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300">
              💌 Create Your Letter Now
            </button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-900 text-gray-400">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-xl">💌</span>
            <span className="text-lg font-display font-bold text-white">LoveDrop</span>
          </div>
          <p className="text-sm">
            Made with ❤️ for long-distance connections
          </p>
          <div className="flex justify-center gap-6 mt-4 text-sm">
            <Link to="/" className="hover:text-white transition-colors">Home</Link>
            <Link to="/create" className="hover:text-white transition-colors">Create</Link>
            <Link to="/gallery" className="hover:text-white transition-colors">Gallery</Link>
          </div>
          <p className="text-xs mt-4 opacity-50">
            © 2026 LoveDrop. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
