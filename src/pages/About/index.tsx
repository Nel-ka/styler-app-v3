export default function About() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">About Styler</h1>
        
        <div className="mb-12">
          <img
            src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80"
            alt="Styler workspace"
            className="w-full h-[400px] object-cover rounded-lg mb-8"
          />
          
          <h2 className="text-2xl font-semibold mb-4">Our Story</h2>
          <p className="text-gray-600 mb-6">
            Founded in 2024, Styler emerged from a simple yet powerful idea: everyone deserves to feel confident in their personal style. We believe that fashion should be accessible, sustainable, and personalized to each individual's unique preferences and body type.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-600 mb-6">
            At Styler, we're committed to revolutionizing the way people discover and express their personal style. Through innovative technology and personalized recommendations, we help our customers build wardrobes that make them feel confident and authentic.
          </p>
        </div>

        <div className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <p className="text-gray-600 mb-2">Email: contact@styler.com</p>
            <p className="text-gray-600 mb-2">Phone: (555) 123-4567</p>
            <p className="text-gray-600">Address: 123 Fashion Street, Style City, ST 12345</p>
          </div>
        </div>
      </section>
    </div>
  );
}