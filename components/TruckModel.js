'use client'
import { useLoader } from '@react-three/fiber'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'
import { MTLLoader } from 'three/examples/jsm/loaders/MTLLoader'
import { useEffect, useRef, useState } from 'react'
import { TextureLoader } from 'three'

export default function TruckModel() {
  const [model, setModel] = useState()

  useEffect(() => {
    const loadModel = async () => {
      const mtlLoader = new MTLLoader()
      const materials = await mtlLoader.loadAsync('/models/Van.mtl')
      materials.preload()

      const objLoader = new OBJLoader()
      objLoader.setMaterials(materials)
      const obj = await objLoader.loadAsync('/models/Van.obj')

      // Load textures
      const textureLoader = new TextureLoader()
      const dashboardTexture = textureLoader.load('/models/textuers/dashboard.png')
      const woodTexture = textureLoader.load('/models/textuers/WoodQuarteredChiffon001_COL_3K.jpg')

      // Traverse and assign textures
      obj.traverse((child) => {
        if (child.isMesh) {
          // Adjust mesh/material names as needed based on your model
          if (child.name.toLowerCase().includes('dashboard')) {
            child.material.map = dashboardTexture
            child.material.needsUpdate = true
          }
          if (child.name.toLowerCase().includes('bed') || child.name.toLowerCase().includes('floor')) {
            child.material.map = woodTexture
            child.material.needsUpdate = true
          }
        }
      })

      setModel(obj)
    }

    loadModel()
  }, [])

  return model ? <primitive object={model} scale={30.0} position={[2, 0, 6]}  /> : null
}
