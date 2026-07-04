import { useParams, Link } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Container from "../components/layout/Container";
import { product } from "../data/product";

import { ArrowLeft, Phone, Mail, MapPin, Globe } from "lucide-react";

const ProductDetails = () => {
  const { id } = useParams();

  const productId = useMemo(() => {
    if (!id) return NaN;
    return Number(id);
  }, [id]);

  const selectedProduct = useMemo(
    () => product.find((item) => item.id === productId),
    [productId]
  );

  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    if (!selectedProduct) return;
    setSelectedImage(selectedProduct.image || selectedProduct.images?.[0] || "");
  }, [selectedProduct]);

  if (!selectedProduct) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h1 className="text-4xl font-bold">Product Not Found</h1>
      </div>
    );
  }

  const galleryImages = selectedProduct.images?.length
    ? selectedProduct.images
    : selectedProduct.image
      ? [selectedProduct.image]
      : [];

  return (
    <>
      <Navbar />

      <div className="bg-brand-gray min-h-screen pt-32 pb-20">
        <Container>
          <Link
            to="/marketplace"
            className="inline-flex items-center gap-2 mb-8 text-brand-dark hover:text-brand-gold transition"
          >
            <ArrowLeft size={20} />
            Back to Marketplace
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="grid lg:grid-cols-2 gap-16"
          >
            {/* LEFT */}
            <div>
              <motion.img
                key={selectedImage}
                src={selectedImage}
                alt={selectedProduct.productName}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.4 }}
                className="w-full h-[520px] rounded-3xl object-cover shadow-2xl"
              />

              {/* Gallery */}
              {galleryImages.length > 0 && (
                <div className="flex gap-4 mt-6 flex-wrap">
                  {galleryImages.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt={`${selectedProduct.productName} - ${index + 1}`}
                      onClick={() => setSelectedImage(img)}
                      className={`w-24 h-24 rounded-xl cursor-pointer object-cover border-4 transition-all duration-300
                        ${selectedImage === img ? "border-brand-gold scale-110" : "border-transparent hover:scale-105"}`}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* RIGHT */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7 }}
            >
              {/* Category */}
              <span className="inline-block bg-brand-gold text-black px-5 py-2 rounded-full font-semibold">
                {selectedProduct.category}
              </span>

              {/* Product Name */}
              <h1 className="text-5xl font-bold text-brand-dark mt-6">
                {selectedProduct.productName}
              </h1>

              {/* Business Name */}
              <h2 className="text-2xl font-semibold text-orange-500 mt-3">
                {selectedProduct.businessName}
              </h2>

              {/* District */}
              <div className="flex items-center gap-3 mt-5 text-lg text-gray-700">
                <MapPin size={20} className="text-red-500" />
                <span>
                  <strong>District:</strong> {(selectedProduct as any).district ?? ""}

                </span>
              </div>

              {/* Description */}
              <div className="mt-8">
                <h3 className="text-xl font-bold mb-3 text-brand-dark">
                  About Product
                </h3>
                <p className="text-gray-600 leading-8">{selectedProduct.description}</p>
              </div>

              {/* Contact Details */}
              <div className="mt-10 bg-white rounded-3xl shadow-lg p-6 space-y-5">
                <div className="flex items-center gap-4">
                  <Phone className="text-orange-500" />
                  <div>
                    <p className="font-semibold">Contact</p>
                    <p>{selectedProduct.contact}</p>
                  </div>
                </div>

                <div className="border-b" />

                <div className="flex items-center gap-4">
                  <Mail className="text-orange-500" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p>{selectedProduct.email}</p>
                  </div>
                </div>

                <div className="border-b" />

                <div className="flex items-center gap-4">
                  <MapPin className="text-orange-500" />
                  <div>
                    <p className="font-semibold">Address</p>
                    <p>{selectedProduct.address}</p>
                  </div>
                </div>

                <div className="border-b" />

                <div className="flex items-center gap-4">
                  <Globe className="text-orange-500" />
                  <div>
                    <p className="font-semibold">Website</p>
                    <a
                      href={selectedProduct.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-blue-600 hover:underline break-all"
                    >
                      {selectedProduct.website}
                    </a>
                  </div>
                </div>
              </div>

              

                
              
            </motion.div>
          </motion.div>
        </Container>
      </div>

      <Footer />
    </>
  );
};

export default ProductDetails;

