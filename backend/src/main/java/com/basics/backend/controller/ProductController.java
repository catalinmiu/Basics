package com.basics.backend.controller;

import com.basics.backend.exception.ProductNotFoundException;
import com.basics.backend.model.Product;
import com.basics.backend.service.ProductService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

import javax.validation.Valid;
import java.net.URI;
import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/products")
public class ProductController {

    private ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<Product>> findAllProducts() {
        List<Product> products = productService.findAll();
        return ResponseEntity.ok(products);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Optional<Product>> findProductById(@PathVariable Long id) {
        Optional<Product> foundProduct = productService.findById(id);
        if (! foundProduct.isPresent()) {
            throw new ProductNotFoundException("Product with id : " + id + " was not found!");
        }

        return ResponseEntity.ok(foundProduct);
    }

    @PostMapping
    public ResponseEntity<Object> addProduct(@Valid @RequestBody Product product) {
        Product savedProduct = productService.save(product);
        URI location = ServletUriComponentsBuilder
                .fromCurrentRequest()
                .path("/{id}")
                .buildAndExpand(savedProduct.getId()).toUri();
        return ResponseEntity.created(location).build();
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Optional<Product>> deleteProductById(@PathVariable Long id) {
        Optional<Product> foundProduct = productService.findById(id);
        if (! foundProduct.isPresent()) {
            throw new ProductNotFoundException("Product with id : " + id + " was not found!");
        }
        productService.deleteById(id);

        return ResponseEntity.ok(foundProduct);
    }

    @GetMapping("/search/{title}")
    public ResponseEntity<List<Product>> findByTitleContaining(@PathVariable String title) {
        List<Product> products = productService.findByTitleContaining(title);
        if (products.size() > 5) {
            products = products.subList(0, 5);
        }
        return ResponseEntity.ok(products);
    }

    @GetMapping("/outOfStock")
    public ResponseEntity<List<Product>> getProductsByStock(Long stock) {
        List<Product> products = productService.findByStockEquals(0L);
        return ResponseEntity.ok(products);
    }

//    @PostMapping("/{id}/image")
//    public String handleImagePost(@PathVariable Long id, @RequestParam("imagefile") MultipartFile file) throws IOException{
//
//        productService.saveImageFile(id, compressBytes(file.getBytes()));
//
//        return "assdf";
//    }

/*
    public static byte[] compressBytes(byte[] data) {
        Deflater deflater = new Deflater();
        deflater.setInput(data);
        deflater.finish();
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        while (!deflater.finished()) {
            int count = deflater.deflate(buffer);
            outputStream.write(buffer, 0, count);
        }
        try {
            outputStream.close();
        } catch (IOException e) {
        }
        System.out.println("Compressed Image Byte Size - " + outputStream.toByteArray().length);
        return outputStream.toByteArray();
    }


//    @GetMapping(path = { "/get/{id}" })
//    public Product getImage(@PathVariable Long id) throws IOException {
//
//        Optional<Product> foundProduct = productService.findById(id);
//        if (! foundProduct.isPresent()) {
//            throw new ProductNotFoundException("Product with id : " + id + " was not found!");
//        }
//        Product product = new Product();
//        product.setImage(decompressBytes(foundProduct.get().getImage()));
//
//        return product;
//
//    }

    public static byte[] decompressBytes(byte[] data) {
        Inflater inflater = new Inflater();
        inflater.setInput(data);
        ByteArrayOutputStream outputStream = new ByteArrayOutputStream(data.length);
        byte[] buffer = new byte[1024];
        try {
            while (!inflater.finished()) {
                int count = inflater.inflate(buffer);
                outputStream.write(buffer, 0, count);
            }
            outputStream.close();
        } catch (IOException ioe) {
        } catch (DataFormatException e) {
        }
        return outputStream.toByteArray();
    }*/


}
