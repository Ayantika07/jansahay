-- JANSAHAY CITIZEN PORTAL DATABASE SCHEMA FOR SUPABASE / POSTGRESQL

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. USERS & PROFILES TABLE
CREATE TABLE IF NOT EXISTS public.profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    full_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20),
    state VARCHAR(100),
    occupation VARCHAR(100),
    annual_income NUMERIC(12, 2),
    is_student BOOLEAN DEFAULT FALSE,
    is_farmer BOOLEAN DEFAULT FALSE,
    is_senior_citizen BOOLEAN DEFAULT FALSE,
    is_bpl BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. GOVERNMENT SCHEMES TABLE
CREATE TABLE IF NOT EXISTS public.schemes (
    id VARCHAR(100) PRIMARY KEY,
    slug VARCHAR(100) UNIQUE NOT NULL,
    name_en TEXT NOT NULL,
    name_hi TEXT NOT NULL,
    name_bn TEXT NOT NULL,
    category VARCHAR(100) NOT NULL,
    ministry TEXT NOT NULL,
    state VARCHAR(100) DEFAULT 'All India',
    is_popular BOOLEAN DEFAULT FALSE,
    short_desc_en TEXT,
    short_desc_hi TEXT,
    short_desc_bn TEXT,
    desc_en TEXT,
    desc_hi TEXT,
    desc_bn TEXT,
    benefits_en JSONB,
    benefits_hi JSONB,
    benefits_bn JSONB,
    eligibility_summary_en TEXT,
    eligibility_summary_hi TEXT,
    eligibility_summary_bn TEXT,
    eligibility_criteria JSONB,
    documents_en JSONB,
    documents_hi JSONB,
    documents_bn JSONB,
    application_process_en JSONB,
    application_process_hi JSONB,
    application_process_bn JSONB,
    official_url TEXT NOT NULL,
    application_url TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- INDEXES FOR SCHEME SEARCH & FILTERING
CREATE INDEX IF NOT EXISTS idx_schemes_category ON public.schemes(category);
CREATE INDEX IF NOT EXISTS idx_schemes_state ON public.schemes(state);
CREATE INDEX IF NOT EXISTS idx_schemes_popular ON public.schemes(is_popular);

-- 3. PUBLIC GRIEVANCES TABLE
CREATE TABLE IF NOT EXISTS public.grievances (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    reference_id VARCHAR(50) UNIQUE NOT NULL,
    citizen_name VARCHAR(255) NOT NULL,
    email VARCHAR(255),
    phone VARCHAR(20),
    department TEXT NOT NULL,
    category VARCHAR(100),
    subject TEXT NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'Submitted',
    timeline JSONB NOT NULL DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX IF NOT EXISTS idx_grievances_ref ON public.grievances(reference_id);
CREATE INDEX IF NOT EXISTS idx_grievances_status ON public.grievances(status);

-- 4. USER SAVED SCHEMES TABLE
CREATE TABLE IF NOT EXISTS public.saved_schemes (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
    scheme_id VARCHAR(100) REFERENCES public.schemes(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, scheme_id)
);

-- SEED SCHEMES DATA
INSERT INTO public.schemes (
    id, slug, name_en, name_hi, name_bn, category, ministry, state, is_popular,
    short_desc_en, short_desc_hi, short_desc_bn,
    desc_en, desc_hi, desc_bn,
    official_url, application_url
) VALUES
(
    'pm-kisan', 'pm-kisan',
    'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)',
    'प्रधानमंत्री किसान सम्मान निधि (PM-KISAN)',
    'প্রধানমন্ত্রী কিষাণ সম্মান নিধি (PM-KISAN)',
    'Agriculture', 'Ministry of Agriculture & Farmers Welfare', 'All India', true,
    'Income support of ₹6,000 per year for all landholding farmer families across India in three equal installments.',
    'भारत के सभी भूमिधारक किसान परिवारों के लिए तीन समान किस्तों में ₹6,000 प्रति वर्ष की आय सहायता।',
    'ভারতের সমস্ত জমিধারী কৃষক পরিবারগুলির জন্য বছরে ৬,০০০ টাকার আর্থিক সহায়তা।',
    'Pradhan Mantri Kisan Samman Nidhi (PM-KISAN) is a Central Sector scheme with 100% funding from Government of India providing ₹6,000 yearly in 3 equal installments.',
    'प्रधानमंत्री किसान सम्मान निधि भारत सरकार से 100% वित्तपोषण के साथ एक केंद्रीय क्षेत्र की योजना है जो प्रति वर्ष ₹6000 की आय सहायता प्रदान करती है।',
    'প্রধানমন্ত্রী কিষাণ সম্মান নিধি ভারত সরকারের শতভাগ অর্থায়নে পরিচালিত একটি কেন্দ্রীয় প্রকল্প যা বছরে ৩টি সমান কিস্তিতে ৬০০০ টাকা দেয়।',
    'https://pmkisan.gov.in', 'https://pmkisan.gov.in/RegistrationFormNew.aspx'
),
(
    'ayushman-bharat', 'ayushman-bharat',
    'Ayushman Bharat Pradhan Mantri Jan Arogya Yojana (PM-JAY)',
    'आयुष्मान भारत प्रधानमंत्री जन आरोग्य योजना (PM-JAY)',
    'আয়ুষ্মান ভারত প্রধানমন্ত্রী জন আরোগ্য যোজনা (PM-JAY)',
    'Healthcare', 'Ministry of Health and Family Welfare', 'All India', true,
    'Health insurance cover of ₹5 Lakh per family per year for secondary and tertiary care hospitalization.',
    'द्वितीयक और तृतीयक देखभाल अस्पताल में भर्ती के लिए प्रति परिवार प्रति वर्ष ₹5 लाख का स्वास्थ्य बीमा कवर।',
    'মাধ্যমিক এবং তৃতীয় স্তরের হাসপাতালে ভর্তির জন্য প্রতি পরিবারে বছরে ৫ লাখ টাকা পর্যন্ত ক্যাশলেস স্বাস্থ্য বীমা।',
    'PM-JAY is the world’s largest health assurance scheme fully financed by the government providing ₹5 lakh health cover annually.',
    'पीएम-जय दुनिया की सबसे बड़ी स्वास्थ्य बीमा योजना है जो प्रति परिवार प्रति वर्ष ₹5 लाख का कवर प्रदान करती है।',
    'পিএম-জেএওয়াই বিশ্বমানের সর্ববৃহৎ সরকারি অর্থায়নে পরিচালিত স্বাস্থ্য বীমা প্রকল্প যা বছরে ৫ লাখ টাকার ক্যাশলেস সুবিধা দেয়।',
    'https://pmjay.gov.in', 'https://beneficiary.nha.gov.in'
)
ON CONFLICT (id) DO NOTHING;
