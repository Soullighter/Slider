<?php

/**
 * Template name: Slider
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package WordPress
 * @subpackage Twenty_Twenty_One
 * @since Twenty Twenty-One 1.0
 */

get_header(); ?>

<div id="primary" class="content-area">
  <main id="main" class="site-main" role="main">

    <header class="page-header">
      <h1 class="page-title"><?php post_type_archive_title(); ?></h1>
    </header>

    <?php
    $args = array(
      'post_type' => 'radovi', // Prikazi samo custom post type 'radovi'
      'posts_per_page' => -1, // Prikazi sve postove tipa 'radovi'
    );

    $query = new WP_Query($args);

    if ($query->have_posts()) :
      while ($query->have_posts()) : $query->the_post();
    ?>
        <article class="mambo" id="post-<?php the_ID(); ?>" <?php post_class(); ?>>


          <div class="entry-thumbnail left-column">
            <?php if (has_post_thumbnail()) {
              the_post_thumbnail('large'); // Prikazi featured sliku sa medium veličinom
            } ?>
          </div>

          <div class="right-column">
            <header class="entry-header"> <!-- TITLE -->
              <h2 class="entry-title"><a href="<?php the_permalink(); ?>"><?php the_title(); ?></a></h2>
            </header>
            <div class="entry-content">
              <?php the_content(); ?>
            </div>
            <button class="modal-button click-me btn-secondary" data-post-id="<?php the_ID(); ?>">Vidi galeriju</button>
          </div>

          <!-- modal -->
          <div id="myModal" class="modal">
            <div class="modal-content">
              <span class="close">&times;</span> <!-- Dugme za zatvaranje modala -->
              <div class="modal-gallery"> <!-- Ovde će biti prikazana galerija slika -->
                <div class="main-image">
                  <img id="mainImage" src="" alt="Galerija slika">
                </div>
                <div class="thumbnails">
                   <?php
                    // Vars
                    $images = get_field('gallery');
                    $size = 'full'; // (thumbnail, medium, large, full or custom size)
        
                    if( $images ): ?>
                      <?php foreach( $images as $image_id ): ?>
                      
                        <?php echo wp_get_attachment_image( $image_id, $size ); ?>
                      
                      <?php endforeach; ?>
                    <?php endif; ?>
        
                </div>
                <div class="arrows">
                  <div class="arrow left">&lt;</div>
                  <div class="arrow right">&gt;</div>
                </div>
              </div>
            </div>
          </div>


        </article> <!-- END of Article-->
      <?php
      endwhile;
      wp_reset_postdata(); // Resetuj WP_Query
    else :
      ?>
      <p><?php _e('Nažalost, trenutno nema unosa za custom post type "radovi".'); ?></p>
    <?php
    endif;
    ?>

  </main>
</div>

<?php get_footer(); ?>
