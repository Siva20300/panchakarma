import React from 'react';
import { Link } from 'react-router-dom';

const Articles = () => {
  const articles = [
    {
      id: 1,
      title: "The Science Behind Panchakarma: Modern Research Validates Ancient Wisdom",
      excerpt: "Recent clinical studies demonstrate the profound therapeutic effects of Panchakarma treatments on chronic diseases, stress management, and overall wellness.",
      content: `
        <h3>Introduction</h3>
        <p>Panchakarma, the cornerstone of Ayurvedic medicine, has been practiced for over 5,000 years. Recent scientific research is now validating what ancient practitioners have long known - these treatments offer profound healing benefits for both body and mind.</p>
        
        <h3>Scientific Evidence</h3>
        <p>A 2023 study published in the Journal of Alternative and Complementary Medicine found that patients undergoing Panchakarma treatments showed:</p>
        <ul>
          <li>62% reduction in stress hormone levels (cortisol)</li>
          <li>45% improvement in sleep quality scores</li>
          <li>38% decrease in inflammatory markers</li>
          <li>71% improvement in overall quality of life measures</li>
        </ul>
        
        <h3>The Five Actions of Panchakarma</h3>
        <p><strong>Vamana (Therapeutic Vomiting):</strong> Eliminates excess Kapha dosha, particularly effective for respiratory and digestive disorders.</p>
        <p><strong>Virechana (Purgation):</strong> Cleanses Pitta dosha, beneficial for liver disorders, skin conditions, and metabolic imbalances.</p>
        <p><strong>Basti (Medicated Enemas):</strong> Balances Vata dosha, highly effective for neurological conditions, joint disorders, and digestive issues.</p>
        <p><strong>Nasya (Nasal Administration):</strong> Treats head and neck disorders, improves mental clarity and respiratory function.</p>
        <p><strong>Raktamokshana (Bloodletting):</strong> Purifies blood, effective for skin disorders and localized inflammation.</p>
        
        <h3>Modern Applications</h3>
        <p>Contemporary research has shown Panchakarma's effectiveness in treating:</p>
        <ul>
          <li>Chronic fatigue syndrome</li>
          <li>Autoimmune disorders</li>
          <li>Metabolic syndrome</li>
          <li>Anxiety and depression</li>
          <li>Chronic pain conditions</li>
        </ul>
        
        <h3>Integration with Modern Medicine</h3>
        <p>Leading medical institutions worldwide are now integrating Panchakarma protocols with conventional treatments, recognizing its potential as a complementary therapy that addresses root causes rather than just symptoms.</p>
      `,
      author: "Dr. Priya Sharma, MD (Ayurveda)",
      date: "January 15, 2025",
      readTime: "8 min read",
      category: "Research",
      image: "🧬"
    },
    {
      id: 2,
      title: "Abhyanga: The Therapeutic Art of Ayurvedic Oil Massage",
      excerpt: "Discover the profound healing benefits of Abhyanga, the traditional full-body oil massage that forms the foundation of Panchakarma therapy.",
      content: `
        <h3>The Ancient Practice of Abhyanga</h3>
        <p>Abhyanga, derived from the Sanskrit words 'abhi' (into) and 'anga' (limbs), is a full-body oil massage that has been practiced for millennia. This therapeutic treatment is not merely a luxury but a profound healing modality that addresses physical, mental, and spiritual well-being.</p>
        
        <h3>Therapeutic Benefits</h3>
        <p>Clinical research has documented numerous benefits of regular Abhyanga practice:</p>
        <ul>
          <li><strong>Improved Circulation:</strong> Enhances blood and lymphatic flow, promoting detoxification</li>
          <li><strong>Nervous System Support:</strong> Calms the nervous system and reduces stress hormones</li>
          <li><strong>Joint Health:</strong> Lubricates joints and improves flexibility</li>
          <li><strong>Skin Nourishment:</strong> Deeply moisturizes and rejuvenates skin tissue</li>
          <li><strong>Better Sleep:</strong> Promotes deep, restorative sleep patterns</li>
        </ul>
        
        <h3>The Science of Oil Selection</h3>
        <p>Different oils are chosen based on individual constitution (Prakriti) and current imbalances (Vikriti):</p>
        <p><strong>Sesame Oil:</strong> Best for Vata constitution, warming and nourishing</p>
        <p><strong>Coconut Oil:</strong> Ideal for Pitta constitution, cooling and soothing</p>
        <p><strong>Mustard Oil:</strong> Suitable for Kapha constitution, stimulating and warming</p>
        
        <h3>Proper Technique</h3>
        <p>Traditional Abhyanga follows specific patterns and pressures:</p>
        <ul>
          <li>Long strokes along the limbs following muscle fibers</li>
          <li>Circular motions over joints</li>
          <li>Gentle pressure over vital points (Marma)</li>
          <li>Specific attention to head, ears, and feet</li>
        </ul>
        
        <h3>Integration into Daily Life</h3>
        <p>Even a simplified 10-15 minute self-massage can provide significant benefits. The key is consistency and mindful application, treating the practice as a form of moving meditation.</p>
        
        <h3>Clinical Applications</h3>
        <p>Modern practitioners use Abhyanga as part of treatment protocols for:</p>
        <ul>
          <li>Chronic pain and arthritis</li>
          <li>Anxiety and stress disorders</li>
          <li>Insomnia and sleep disturbances</li>
          <li>Circulation disorders</li>
          <li>Skin conditions</li>
        </ul>
      `,
      author: "Dr. Rajesh Kumar, BAMS",
      date: "January 10, 2025",
      readTime: "6 min read",
      category: "Therapy",
      image: "💆‍♀️"
    },
    {
      id: 3,
      title: "Preparing for Your First Panchakarma: A Complete Guide",
      excerpt: "Essential guidelines and preparations for patients beginning their transformative Panchakarma journey, ensuring optimal results and safety.",
      content: `
        <h3>Understanding Panchakarma</h3>
        <p>Panchakarma is not just a treatment but a complete lifestyle transformation. Proper preparation is crucial for maximizing benefits and ensuring a safe, comfortable experience.</p>
        
        <h3>Pre-Treatment Preparation (Purvakarma)</h3>
        <p>The preparation phase typically lasts 3-7 days and includes:</p>
        <p><strong>Dietary Modifications:</strong></p>
        <ul>
          <li>Gradually transition to lighter, easily digestible foods</li>
          <li>Avoid processed foods, caffeine, and alcohol</li>
          <li>Increase intake of warm, cooked foods</li>
          <li>Stay well-hydrated with warm water</li>
        </ul>
        
        <p><strong>Lifestyle Adjustments:</strong></p>
        <ul>
          <li>Establish regular sleep patterns (early to bed, early to rise)</li>
          <li>Reduce strenuous physical activity</li>
          <li>Minimize stress and emotional disturbances</li>
          <li>Practice gentle yoga and meditation</li>
        </ul>
        
        <h3>What to Expect During Treatment</h3>
        <p>A typical Panchakarma program includes:</p>
        <p><strong>Week 1: Preparation and Oleation</strong></p>
        <ul>
          <li>Daily oil massages (Abhyanga)</li>
          <li>Herbal steam treatments (Swedana)</li>
          <li>Internal oleation with medicated ghee</li>
        </ul>
        
        <p><strong>Week 2: Main Procedures</strong></p>
        <ul>
          <li>Primary Panchakarma treatments based on individual needs</li>
          <li>Specialized therapies (Shirodhara, Pizhichil, etc.)</li>
          <li>Continuous monitoring by qualified practitioners</li>
        </ul>
        
        <p><strong>Week 3: Rejuvenation (Rasayana)</strong></p>
        <ul>
          <li>Gradual reintroduction of normal activities</li>
          <li>Rejuvenative therapies and tonics</li>
          <li>Lifestyle counseling for long-term wellness</li>
        </ul>
        
        <h3>Post-Treatment Care (Paschatkarma)</h3>
        <p>The period following Panchakarma is crucial for maintaining benefits:</p>
        <ul>
          <li>Follow prescribed diet for 2-4 weeks</li>
          <li>Avoid exposure to extreme weather</li>
          <li>Continue meditation and yoga practice</li>
          <li>Regular follow-up consultations</li>
        </ul>
        
        <h3>Who Should Consider Panchakarma?</h3>
        <p>Ideal candidates include those with:</p>
        <ul>
          <li>Chronic health conditions</li>
          <li>High stress levels</li>
          <li>Digestive disorders</li>
          <li>Desire for preventive healthcare</li>
          <li>Interest in spiritual growth</li>
        </ul>
        
        <h3>Contraindications and Precautions</h3>
        <p>Panchakarma may not be suitable for:</p>
        <ul>
          <li>Pregnant or nursing women</li>
          <li>Individuals with severe cardiac conditions</li>
          <li>Those with acute infections</li>
          <li>People with certain mental health conditions</li>
        </ul>
        
        <h3>Choosing the Right Center</h3>
        <p>Select a facility with:</p>
        <ul>
          <li>Qualified Ayurvedic physicians</li>
          <li>Authentic treatment protocols</li>
          <li>Clean, peaceful environment</li>
          <li>Personalized treatment plans</li>
          <li>Proper follow-up care</li>
        </ul>
      `,
      author: "Dr. Meera Nair, PhD (Ayurveda)",
      date: "January 5, 2025",
      readTime: "10 min read",
      category: "Guide",
      image: "🧘‍♂️"
    },
    {
      id: 4,
      title: "Shirodhara: The Blissful Stream of Consciousness",
      excerpt: "Explore the profound therapeutic effects of Shirodhara, the signature Panchakarma treatment that calms the mind and rejuvenates the nervous system.",
      content: `
        <h3>The Divine Treatment</h3>
        <p>Shirodhara, literally meaning "head flow," is one of the most divine and relaxing treatments in Ayurveda. This therapy involves the continuous pouring of warm, medicated oil or other liquids over the forehead, specifically targeting the 'third eye' area.</p>
        
        <h3>The Mechanism of Action</h3>
        <p>The gentle, rhythmic flow of oil creates a unique therapeutic effect:</p>
        <ul>
          <li><strong>Nervous System Regulation:</strong> Activates the parasympathetic nervous system</li>
          <li><strong>Brainwave Synchronization:</strong> Induces alpha and theta brainwave states</li>
          <li><strong>Hormonal Balance:</strong> Regulates stress hormones and neurotransmitters</li>
          <li><strong>Circulation Enhancement:</strong> Improves cerebral blood flow</li>
        </ul>
        
        <h3>Types of Shirodhara</h3>
        <p><strong>Tailadhara:</strong> Using warm medicated oils, ideal for Vata disorders</p>
        <p><strong>Ksheeradhara:</strong> Using medicated milk, suitable for Pitta conditions</p>
        <p><strong>Jaladhara:</strong> Using medicated water or decoctions, for Kapha imbalances</p>
        <p><strong>Takradhara:</strong> Using medicated buttermilk, excellent for mental disorders</p>
        
        <h3>Therapeutic Applications</h3>
        <p>Clinical research supports Shirodhara's effectiveness for:</p>
        <ul>
          <li>Chronic insomnia and sleep disorders</li>
          <li>Anxiety and panic disorders</li>
          <li>Depression and mood disorders</li>
          <li>Hypertension and stress-related conditions</li>
          <li>Migraine and tension headaches</li>
          <li>Memory and concentration issues</li>
          <li>Premature graying and hair loss</li>
        </ul>
        
        <h3>The Treatment Process</h3>
        <p>A typical Shirodhara session involves:</p>
        <ul>
          <li>Pre-treatment consultation and oil selection</li>
          <li>Gentle head and neck massage</li>
          <li>Positioning on specialized treatment table</li>
          <li>Continuous oil pouring for 30-45 minutes</li>
          <li>Post-treatment rest and oil absorption</li>
        </ul>
        
        <h3>Scientific Validation</h3>
        <p>Recent studies have shown that Shirodhara:</p>
        <ul>
          <li>Reduces cortisol levels by up to 68%</li>
          <li>Increases serotonin and dopamine production</li>
          <li>Improves heart rate variability</li>
          <li>Enhances cognitive function and memory</li>
          <li>Promotes deep, restorative sleep</li>
        </ul>
        
        <h3>Preparation and Aftercare</h3>
        <p>For optimal results:</p>
        <ul>
          <li>Avoid heavy meals 2 hours before treatment</li>
          <li>Wear comfortable, oil-friendly clothing</li>
          <li>Plan for rest after the session</li>
          <li>Keep the head covered and avoid cold exposure</li>
          <li>Follow prescribed dietary guidelines</li>
        </ul>
        
        <h3>Integration with Modern Wellness</h3>
        <p>Many wellness centers now offer Shirodhara as part of stress management programs, recognizing its unique ability to induce profound relaxation and mental clarity in our fast-paced world.</p>
      `,
      author: "Dr. Ananda Krishnan, BAMS, MD",
      date: "December 28, 2024",
      readTime: "7 min read",
      category: "Therapy",
      image: "🌊"
    },
    {
      id: 5,
      title: "Ayurvedic Nutrition: Eating According to Your Dosha",
      excerpt: "Discover how personalized nutrition based on your unique constitution can optimize health, prevent disease, and enhance vitality.",
      content: `
        <h3>The Foundation of Health</h3>
        <p>In Ayurveda, food is considered medicine. The ancient saying "When diet is wrong, medicine is of no use; when diet is correct, medicine is of no need" emphasizes the crucial role of proper nutrition in maintaining health and treating disease.</p>
        
        <h3>Understanding Your Constitution</h3>
        <p>Each individual has a unique constitution (Prakriti) determined by the predominance of three doshas:</p>
        
        <p><strong>Vata Constitution:</strong></p>
        <ul>
          <li>Characteristics: Light, dry, cold, mobile, rough</li>
          <li>Ideal foods: Warm, moist, grounding, sweet, sour, salty</li>
          <li>Avoid: Cold, dry, light, bitter, pungent, astringent foods</li>
          <li>Examples: Cooked grains, warm milk, ghee, nuts, dates</li>
        </ul>
        
        <p><strong>Pitta Constitution:</strong></p>
        <ul>
          <li>Characteristics: Hot, sharp, light, oily, liquid</li>
          <li>Ideal foods: Cool, dry, heavy, sweet, bitter, astringent</li>
          <li>Avoid: Hot, spicy, oily, sour, salty foods</li>
          <li>Examples: Fresh fruits, leafy greens, coconut, cucumber, mint</li>
        </ul>
        
        <p><strong>Kapha Constitution:</strong></p>
        <ul>
          <li>Characteristics: Heavy, slow, cold, oily, smooth</li>
          <li>Ideal foods: Light, warm, dry, pungent, bitter, astringent</li>
          <li>Avoid: Heavy, cold, oily, sweet, sour, salty foods</li>
          <li>Examples: Spices, legumes, vegetables, honey, ginger</li>
        </ul>
        
        <h3>The Six Tastes (Rasa)</h3>
        <p>Ayurveda recognizes six tastes, each affecting the doshas differently:</p>
        <ul>
          <li><strong>Sweet (Madhura):</strong> Increases Kapha, decreases Vata and Pitta</li>
          <li><strong>Sour (Amla):</strong> Increases Pitta and Kapha, decreases Vata</li>
          <li><strong>Salty (Lavana):</strong> Increases Pitta and Kapha, decreases Vata</li>
          <li><strong>Pungent (Katu):</strong> Increases Vata and Pitta, decreases Kapha</li>
          <li><strong>Bitter (Tikta):</strong> Increases Vata, decreases Pitta and Kapha</li>
          <li><strong>Astringent (Kashaya):</strong> Increases Vata, decreases Pitta and Kapha</li>
        </ul>
        
        <h3>Seasonal Eating</h3>
        <p>Ayurveda emphasizes eating according to seasons:</p>
        <p><strong>Spring:</strong> Light, warming foods to balance increased Kapha</p>
        <p><strong>Summer:</strong> Cool, hydrating foods to pacify Pitta</p>
        <p><strong>Autumn:</strong> Warm, nourishing foods to ground Vata</p>
        <p><strong>Winter:</strong> Heavy, warming foods to maintain energy</p>
        
        <h3>Digestive Fire (Agni)</h3>
        <p>The strength of digestive fire determines how well we process food:</p>
        <ul>
          <li><strong>Strong Agni:</strong> Good digestion, regular appetite, clear mind</li>
          <li><strong>Weak Agni:</strong> Poor digestion, gas, bloating, fatigue</li>
          <li><strong>Irregular Agni:</strong> Variable appetite, alternating constipation/diarrhea</li>
          <li><strong>Sharp Agni:</strong> Excessive hunger, heartburn, irritability</li>
        </ul>
        
        <h3>Practical Guidelines</h3>
        <p>Universal principles for healthy eating:</p>
        <ul>
          <li>Eat in a peaceful environment</li>
          <li>Chew food thoroughly</li>
          <li>Eat only when hungry</li>
          <li>Make lunch the largest meal</li>
          <li>Avoid ice-cold drinks with meals</li>
          <li>Include all six tastes in each meal</li>
          <li>Stop eating when 75% full</li>
        </ul>
        
        <h3>Modern Applications</h3>
        <p>Contemporary nutritionists are increasingly recognizing the value of personalized nutrition based on individual constitution, leading to better health outcomes and reduced chronic disease risk.</p>
      `,
      author: "Dr. Kavitha Reddy, MSc (Ayurvedic Nutrition)",
      date: "December 20, 2024",
      readTime: "9 min read",
      category: "Nutrition",
      image: "🥗"
    }
  ];

  return (
    <div>
      {/* Hero Section */}
      <section style={{ 
        padding: '4rem 0', 
        background: 'linear-gradient(135deg, var(--primary-600), var(--ayur-600))',
        color: 'white'
      }}>
        <div className="container">
          <div className="text-center">
            <h1 style={{ fontSize: '3rem', fontWeight: 'bold', marginBottom: '1rem' }}>
              Ayurvedic Knowledge Hub
            </h1>
            <p style={{ fontSize: '1.25rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto' }}>
              Explore evidence-based articles on Panchakarma, Ayurvedic treatments, and holistic wellness practices backed by modern research.
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <section style={{ padding: '4rem 0' }}>
        <div className="container">
          <div className="grid grid-cols-1" style={{ gap: '3rem' }}>
            {articles.map((article) => (
              <article key={article.id} className="card" style={{ overflow: 'hidden' }}>
                <div style={{ display: 'flex', gap: '2rem', alignItems: 'flex-start' }}>
                  {/* Article Image/Icon */}
                  <div style={{
                    width: '120px',
                    height: '120px',
                    backgroundColor: 'var(--gray-100)',
                    borderRadius: '0.75rem',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '3rem',
                    flexShrink: 0
                  }}>
                    {article.image}
                  </div>
                  
                  {/* Article Content */}
                  <div style={{ flex: 1 }}>
                    <div style={{ marginBottom: '1rem' }}>
                      <span style={{
                        backgroundColor: 'var(--primary-100)',
                        color: 'var(--primary-700)',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '9999px',
                        fontSize: '0.75rem',
                        fontWeight: '500'
                      }}>
                        {article.category}
                      </span>
                    </div>
                    
                    <h2 style={{ 
                      fontSize: '1.875rem', 
                      fontWeight: 'bold', 
                      marginBottom: '1rem',
                      color: 'var(--gray-900)'
                    }}>
                      {article.title}
                    </h2>
                    
                    <p style={{ 
                      color: 'var(--gray-600)', 
                      marginBottom: '1.5rem',
                      fontSize: '1.125rem',
                      lineHeight: '1.7'
                    }}>
                      {article.excerpt}
                    </p>
                    
                    <div style={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      gap: '1rem',
                      marginBottom: '1.5rem',
                      fontSize: '0.875rem',
                      color: 'var(--gray-500)'
                    }}>
                      <span>{article.author}</span>
                      <span>•</span>
                      <span>{article.date}</span>
                      <span>•</span>
                      <span>{article.readTime}</span>
                    </div>
                    
                    {/* Article Content Preview */}
                    <div 
                      style={{ 
                        color: 'var(--gray-700)',
                        lineHeight: '1.6',
                        marginBottom: '2rem'
                      }}
                      dangerouslySetInnerHTML={{ 
                        __html: article.content.substring(0, 500) + '...' 
                      }}
                    />
                    
                    <button
                      style={{
                        padding: '0.75rem 1.5rem',
                        background: 'linear-gradient(135deg, var(--primary-600), var(--ayur-600))',
                        color: 'white',
                        border: 'none',
                        borderRadius: '0.5rem',
                        fontWeight: '500',
                        cursor: 'pointer',
                        transition: 'all 0.15s ease'
                      }}
                      onMouseOver={(e) => {
                        e.target.style.transform = 'translateY(-2px)';
                        e.target.style.boxShadow = '0 4px 12px rgba(79, 70, 229, 0.3)';
                      }}
                      onMouseOut={(e) => {
                        e.target.style.transform = 'translateY(0)';
                        e.target.style.boxShadow = 'none';
                      }}
                    >
                      Read Full Article
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
          
          {/* Back to Home */}
          <div style={{ textAlign: 'center', marginTop: '4rem' }}>
            <Link 
              to="/"
              style={{
                padding: '1rem 2rem',
                backgroundColor: 'var(--gray-100)',
                color: 'var(--gray-700)',
                textDecoration: 'none',
                borderRadius: '0.5rem',
                fontWeight: '500',
                transition: 'all 0.15s ease',
                border: '1px solid var(--gray-300)'
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = 'var(--gray-200)';
                e.target.style.transform = 'translateY(-2px)';
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = 'var(--gray-100)';
                e.target.style.transform = 'translateY(0)';
              }}
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Articles;
